import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-orange/30 relative overflow-x-hidden">
        {/* Decorative background glowing orbs using the accent colors */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-coral/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
