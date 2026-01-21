import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Agency/Home';
import AcademyHome from './pages/Academy/AcademyHome';
import StudentDashboard from './pages/Academy/StudentDashboard';
import AdminDashboard from './pages/Academy/AdminDashboard';
import { ReactLenis } from '@studio-freight/react-lenis';
import DashboardLayout from './components/layouts/DashboardLayout'; // Assuming this new component exists

function App() {
  return (
    <Router>
      <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Academy Routes */}
          <Route path="/academy" element={<MainLayout />}>
            <Route index element={<AcademyHome />} />
          </Route>

          {/* Dashboard Routes with Sidebar Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </ReactLenis>
    </Router>
  );
}

export default App;
