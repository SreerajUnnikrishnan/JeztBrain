const BACKEND_URL = 'http://localhost:5000';

const activeSubscriptions = [];

function triggerSubscriptions(table, event, record) {
  activeSubscriptions.forEach(sub => {
    if (sub.table === table && (sub.event === '*' || sub.event === event)) {
      try {
        sub.callback({
          eventType: event,
          new: record,
          old: event === 'DELETE' ? record : {}
        });
      } catch (err) {
        console.error('[MockRealtime] Callback error:', err);
      }
    }
  });
}

class QueryBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this.filters = [];
    this.orderBy = null;
    this.limitVal = null;
    this.isSingle = false;
    this.isMaybeSingle = false;
    this.operation = 'select';
    this.data = null;
  }

  select(fields = '*') {
    this.operation = 'select';
    return this;
  }

  insert(data) {
    this.operation = 'insert';
    this.data = data;
    return this;
  }

  update(data) {
    this.operation = 'update';
    this.data = data;
    return this;
  }

  delete() {
    this.operation = 'delete';
    return this;
  }

  upsert(data) {
    this.operation = 'upsert';
    this.data = data;
    return this;
  }

  eq(field, value) {
    this.filters.push({ field, value, type: 'eq' });
    return this;
  }

  neq(field, value) {
    this.filters.push({ field, value, type: 'neq' });
    return this;
  }

  order(field, { ascending = true } = {}) {
    this.orderBy = { field, ascending };
    return this;
  }

  limit(val) {
    this.limitVal = val;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  async then(onfulfilled, onrejected) {
    try {
      // Retrieve session token to authenticate query if needed
      const sessionStr = localStorage.getItem('jeztbrain_session');
      const session = sessionStr ? JSON.parse(sessionStr) : null;
      const token = session?.access_token;

      const response = await fetch(`${BACKEND_URL}/api/mock-db-op`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          action: 'query',
          table: this.tableName,
          builder: {
            operation: this.operation,
            filters: this.filters,
            orderBy: this.orderBy,
            limitVal: this.limitVal,
            isSingle: this.isSingle,
            isMaybeSingle: this.isMaybeSingle,
            data: this.data
          }
        })
      });

      const result = await response.json();
      
      if (!result.error && ['insert', 'update', 'upsert', 'delete'].includes(this.operation)) {
        const rows = Array.isArray(result.data) ? result.data : (result.data ? [result.data] : []);
        const eventMap = { insert: 'INSERT', update: 'UPDATE', upsert: 'UPDATE', delete: 'DELETE' };
        const event = eventMap[this.operation];
        rows.forEach(row => {
          triggerSubscriptions(this.tableName, event, row);
        });
      }

      return onfulfilled ? onfulfilled(result) : result;
    } catch (err) {
      const errorResult = { data: null, error: { message: err.message || 'Fetch failed' } };
      if (onrejected) return onrejected(errorResult);
      return errorResult;
    }
  }
}

const authListeners = new Set();

export const mockSupabase = {
  from: (tableName) => new QueryBuilder(tableName),

  auth: {
    signInWithPassword: async ({ email, password }) => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/mock-db-op`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email, password })
        });
        const result = await response.json();
        
        if (result.error) {
          return { data: { user: null, session: null }, error: result.error };
        }

        localStorage.setItem('jeztbrain_session', JSON.stringify(result.data.session));
        authListeners.forEach(listener => listener('SIGNED_IN', result.data.session));

        return { data: { user: result.data.user, session: result.data.session }, error: null };
      } catch (err) {
        return { data: { user: null, session: null }, error: { message: err.message || 'Auth fetch failed' } };
      }
    },

    signUp: async ({ email, password, options }) => {
      try {
        const metadata = options?.data || {};
        const response = await fetch(`${BACKEND_URL}/api/mock-db-op`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', email, password, metadata })
        });
        const result = await response.json();

        if (result.error) {
          return { data: { user: null, session: null }, error: result.error };
        }

        localStorage.setItem('jeztbrain_session', JSON.stringify(result.data.session));
        authListeners.forEach(listener => listener('SIGNED_IN', result.data.session));

        return { data: { user: result.data.user, session: result.data.session }, error: null };
      } catch (err) {
        return { data: { user: null, session: null }, error: { message: err.message || 'Signup fetch failed' } };
      }
    },

    signOut: async () => {
      localStorage.removeItem('jeztbrain_session');
      authListeners.forEach(listener => listener('SIGNED_OUT', null));
      return { error: null };
    },

    getSession: async () => {
      const sessionStr = localStorage.getItem('jeztbrain_session');
      if (!sessionStr) return { data: { session: null }, error: null };
      try {
        const rawSession = JSON.parse(sessionStr);
        // Synthesize full user from stored user or decode the JWT
        let user = rawSession.user || null;
        if (!user && rawSession.access_token) {
          try {
            const parts = rawSession.access_token.split('.');
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            user = {
              id: payload.sub,
              email: payload.email,
              role: payload.role,
              user_metadata: { role: payload.role, displayName: payload.displayName }
            };
          } catch {}
        }
        const session = user ? { ...rawSession, user } : rawSession;
        return { data: { session }, error: null };
      } catch {
        return { data: { session: null }, error: null };
      }
    },

    onAuthStateChange: (callback) => {
      authListeners.add(callback);
      // NOTE: We don't fire SIGNED_IN here — AuthContext's getSession() already handles
      // initial session restore. Firing both causes double resolveUser calls.
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authListeners.delete(callback);
            }
          }
        }
      };
    },

    updateUser: async (updates) => {
      // Mock user update locally
      return { data: { user: {} }, error: null };
    }
  },

  storage: {
    from: (bucket) => ({
      upload: async (filePath, file) => ({ data: { path: filePath }, error: null }),
      getPublicUrl: (filePath) => ({ data: { publicUrl: `/placeholder_media.png` } })
    })
  },

  channel: (name) => {
    const listeners = [];
    const channelObj = {
      on: (type, filter, callback) => {
        listeners.push({ type, filter, callback });
        return channelObj;
      },
      subscribe: () => {
        listeners.forEach(l => {
          activeSubscriptions.push({
            channelName: name,
            event: l.filter.event || '*',
            table: l.filter.table,
            callback: l.callback
          });
        });
        return channelObj;
      }
    };
    return channelObj;
  },

  removeChannel: (channel) => {
    // Clean up channel listeners if needed
  }
};
