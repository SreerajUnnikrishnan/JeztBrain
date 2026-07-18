import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import Landing from './pages/Landing';
import About from './pages/About';
import Auth from './pages/Auth';
import UserDashboard from './pages/UserDashboard';
import ReportIncident from './pages/ReportIncident';
import Chat from './pages/Chat';
import IncidentTracking from './pages/IncidentTracking';
import IncidentDetail from './pages/IncidentDetail';
import FilesMedia from './pages/FilesMedia';
import ProfileSettings from './pages/ProfileSettings';

import ExpertLayout from './pages/expert/ExpertLayout';
import ExpertDashboardView from './pages/expert/Dashboard';
import Cases from './pages/expert/Cases';
import LiveChat from './pages/expert/LiveChat';
import ThreatIntel from './pages/expert/ThreatIntel';
import Profile from './pages/expert/Profile';
import ReportCenter from './pages/expert/ReportCenter';
import RewardsRevenue from './pages/expert/RewardsRevenue';
import Monitoring from './pages/expert/Monitoring';
import Scanner from './pages/expert/Scanner';
import Notifications from './pages/expert/Notifications';
import Settings from './pages/expert/Settings';
import AdminDashboard from './pages/AdminDashboard';
import FindExperts from './pages/FindExperts';
import ExpertProfile from './pages/ExpertProfile';
import SocDashboard from './pages/SocDashboard';
import StartupSecurity from './pages/StartupSecurity';
import JeztBrainSpider from './pages/platform/JeztBrainSpider';
import Navbar from './components/Layout/Navbar';
import AIResponderWidget from './components/AI/AIResponderWidget';
import DashboardLayout from './components/Layout/DashboardLayout';
import { Toaster } from 'react-hot-toast';

// ─── Specialist roles ─────────────────────────────────────────────────────────
const SPECIALIST_ROLES = ['security_specialist', 'network_specialist', 'expert', 'security', 'network'];

function getExpertDashboardPath(role) {
  return (role === 'network_specialist' || role === 'network') ? '/network-dashboard' : '/expert-dashboard';
}

// ─── ProtectedRoute ───────────────────────────────────────────────────────────
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    const isSpec = SPECIALIST_ROLES.includes(role);
    const redirect = isSpec ? getExpertDashboardPath(role) : '/user-dashboard';
    return <Navigate to={redirect} replace />;
  }

  return children;
};

// ─── Auth page redirect if already logged in ──────────────────────────────────
const AuthRedirect = () => {
  const { user, role, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Auth />;

  if (SPECIALIST_ROLES.includes(role)) {
    return <Navigate to={getExpertDashboardPath(role)} replace />;
  }
  return <Navigate to="/user-dashboard" replace />;
};

// ─── App Routes ───────────────────────────────────────────────────────────────
function AppRoutes() {
  const location = useLocation();

  const DASHBOARD_PATHS = [
    '/dashboard', '/user-dashboard', '/report', '/chat', '/incidents',
    '/files', '/profile', '/status', '/payment', '/experts',
  ];

  const isDashboardRoute = DASHBOARD_PATHS.some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  );

  const isExpertRoute = location.pathname.toLowerCase().startsWith('/expert-') || location.pathname.toLowerCase().startsWith('/network-dashboard');
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');
  const isShellRoute = isDashboardRoute && !isExpertRoute && !isAdminRoute;



  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#030712] text-black dark:text-white transition-colors duration-300">
      {!isShellRoute && !isExpertRoute && !isAdminRoute && <Navbar />}

      {isShellRoute ? (
        <DashboardLayout>
          <Routes>
            <Route path="/dashboard" element={<Navigate to="/user-dashboard" replace />} />
            <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute allowedRoles={['user']}><ReportIncident /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute allowedRoles={['user', ...SPECIALIST_ROLES, 'admin']}><Chat /></ProtectedRoute>} />
            <Route path="/incidents" element={<ProtectedRoute allowedRoles={['user']}><IncidentTracking /></ProtectedRoute>} />
            <Route path="/incidents/:id" element={<ProtectedRoute allowedRoles={['user']}><IncidentDetail /></ProtectedRoute>} />
            <Route path="/files" element={<ProtectedRoute allowedRoles={['user']}><FilesMedia /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['user', ...SPECIALIST_ROLES, 'admin']}><ProfileSettings /></ProtectedRoute>} />
            <Route path="/experts" element={<ProtectedRoute allowedRoles={['user', ...SPECIALIST_ROLES, 'admin']}><FindExperts /></ProtectedRoute>} />
            <Route path="/experts/:id" element={<ProtectedRoute allowedRoles={['user', ...SPECIALIST_ROLES, 'admin']}><ExpertProfile /></ProtectedRoute>} />
            <Route path="/status" element={<ProtectedRoute allowedRoles={['user']}><div className="text-white p-8">System Status — coming soon</div></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute allowedRoles={['user']}><div className="text-white p-8">Payments — coming soon</div></ProtectedRoute>} />
          </Routes>
        </DashboardLayout>
      ) : (
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/soc-dashboard" element={<SocDashboard />} />
            <Route path="/startup-security" element={<StartupSecurity />} />
            <Route path="/platform/jeztbrainspider" element={<JeztBrainSpider />} />
            <Route path="/jeztbrainspider" element={<JeztBrainSpider />} />
            <Route path="/auth" element={<AuthRedirect />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/signup" element={<Navigate to="/auth?signup=true" replace />} />

            {/* Expert dashboards */}
            <Route path="/expert-dashboard" element={<ProtectedRoute allowedRoles={[...SPECIALIST_ROLES, 'admin']}><ExpertLayout /></ProtectedRoute>}>
              <Route index element={<ExpertDashboardView />} />
              <Route path="cases" element={<Cases />} />
              <Route path="chat" element={<LiveChat />} />
              <Route path="intel" element={<ThreatIntel />} />
              <Route path="reports" element={<ReportCenter />} />
              <Route path="rewards" element={<RewardsRevenue />} />
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/network-dashboard" element={<Navigate to="/expert-dashboard" replace />} />
            <Route path="/expert/*" element={<Navigate to="/expert-dashboard" replace />} />

            {/* Admin */}
            <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}

      <AIResponderWidget />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <SocketProvider>
            <Router>
              <AppRoutes />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#0F172A',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'monospace',
                  },
                  success: { iconTheme: { primary: '#10b981', secondary: '#0F172A' } },
                  error: { iconTheme: { primary: '#ef4444', secondary: '#0F172A' } },
                }}
              />
            </Router>
          </SocketProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
