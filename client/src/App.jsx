import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Agency/Home';
import AcademyHome from './pages/Academy/AcademyHome';
import StudentDashboard from './pages/Academy/StudentDashboard';
import AdminDashboard from './pages/Academy/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-black font-sans">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/academy" element={<AcademyHome />} />
          </Route>

          {/* Dashboard Routes (No Navbar, has Sidebar) */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Catch all or 404 can be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
