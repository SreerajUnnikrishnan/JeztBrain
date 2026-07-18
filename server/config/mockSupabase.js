import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../db/mock_db.json');

function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify({
        profiles: [],
        incidents: [],
        messages: [],
        notifications: [],
        incident_activity_logs: [],
        expert_rewards: [],
        expert_payouts: [],
        expert_badges: [],
        ai_messages: [],
        passwords: {}
      }, null, 2));
    }
    const content = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('[MockDB] Read error:', err);
    return {};
  }
}

export function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[MockDB] Write error:', err);
  }
}

export function runDbQuery(builder) {
  const db = readDb();
  const tableName = builder.tableName;
  if (!db[tableName]) {
    db[tableName] = [];
  }
  const tableData = db[tableName];

  let affectedRows = [];
  let error = null;

  if (builder.operation === 'select') {
    let temp = [...tableData];
    for (const filter of builder.filters) {
      temp = temp.filter(row => {
        const rowVal = row[filter.field];
        if (filter.type === 'eq') {
          return String(rowVal) === String(filter.value);
        } else if (filter.type === 'neq') {
          return String(rowVal) !== String(filter.value);
        }
        return true;
      });
    }

    if (builder.orderBy) {
      const { field, ascending } = builder.orderBy;
      temp.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (typeof valA === 'string') {
          return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return ascending ? valA - valB : valB - valA;
      });
    }

    if (builder.limitVal !== null) {
      temp = temp.slice(0, builder.limitVal);
    }

    affectedRows = temp;
  } else if (builder.operation === 'insert') {
    let rowsToInsert = Array.isArray(builder.data) ? builder.data : [builder.data];
    rowsToInsert = rowsToInsert.map(row => ({
      id: row.id || generateUuid(),
      created_at: row.created_at || new Date().toISOString(),
      ...row
    }));
    db[tableName] = [...tableData, ...rowsToInsert];
    writeDb(db);
    affectedRows = rowsToInsert;
  } else if (builder.operation === 'update') {
    const updatedRows = [];
    tableData.forEach((row, idx) => {
      let matches = true;
      for (const filter of builder.filters) {
        const rowVal = row[filter.field];
        if (filter.type === 'eq') {
          if (String(rowVal) !== String(filter.value)) matches = false;
        } else if (filter.type === 'neq') {
          if (String(rowVal) === String(filter.value)) matches = false;
        }
      }
      if (matches) {
        const updatedRow = {
          ...row,
          ...builder.data,
          updated_at: new Date().toISOString()
        };
        tableData[idx] = updatedRow;
        updatedRows.push(updatedRow);
      }
    });
    writeDb(db);
    affectedRows = updatedRows;
  } else if (builder.operation === 'delete') {
    const keptRows = [];
    tableData.forEach(row => {
      let matches = true;
      for (const filter of builder.filters) {
        const rowVal = row[filter.field];
        if (filter.type === 'eq') {
          if (String(rowVal) !== String(filter.value)) matches = false;
        } else if (filter.type === 'neq') {
          if (String(rowVal) === String(filter.value)) matches = false;
        }
      }
      if (matches) {
        affectedRows.push(row);
      } else {
        keptRows.push(row);
      }
    });
    db[tableName] = keptRows;
    writeDb(db);
  } else if (builder.operation === 'upsert') {
    const rowsToUpsert = Array.isArray(builder.data) ? builder.data : [builder.data];
    rowsToUpsert.forEach(row => {
      let idx = -1;
      if (row.id) {
        idx = tableData.findIndex(r => r.id === row.id);
      }
      if (idx !== -1) {
        tableData[idx] = { ...tableData[idx], ...row, updated_at: new Date().toISOString() };
        affectedRows.push(tableData[idx]);
      } else {
        const newRow = {
          id: row.id || generateUuid(),
          created_at: row.created_at || new Date().toISOString(),
          ...row
        };
        tableData.push(newRow);
        affectedRows.push(newRow);
      }
    });
    writeDb(db);
  }

  let resultData = affectedRows;
  if (builder.isSingle || builder.isMaybeSingle) {
    resultData = affectedRows[0] || null;
    if (builder.isSingle && !resultData) {
      error = { message: 'Row not found', code: 'PGRST116' };
    }
  }

  return { data: resultData, error };
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
      const result = runDbQuery(this);
      return onfulfilled ? onfulfilled(result) : result;
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

function decodeToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Payload = parts[1];
    const json = Buffer.from(base64Payload, 'base64url').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const mockSupabase = {
  from: (tableName) => new QueryBuilder(tableName),
  
  auth: {
    getUser: async (token) => {
      const decoded = decodeToken(token);
      if (!decoded || !decoded.sub) {
        return { data: { user: null }, error: { message: 'Invalid token' } };
      }
      const db = readDb();
      const userProfile = db.profiles.find(p => p.id === decoded.sub);
      if (!userProfile) {
        return { data: { user: null }, error: { message: 'User profile not found' } };
      }
      return {
        data: {
          user: {
            id: userProfile.id,
            email: userProfile.email,
            user_metadata: {
              role: userProfile.role,
              displayName: userProfile.display_name
            },
            role: userProfile.role
          }
        },
        error: null
      };
    }
  },
  
  storage: {
    from: (bucket) => ({
      upload: async (filePath, file) => ({ data: { path: filePath }, error: null }),
      getPublicUrl: (filePath) => ({ data: { publicUrl: `/placeholder_media.png` } })
    })
  }
};
