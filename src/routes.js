import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Board from './pages/Board.jsx';
import Settings from './pages/Settings.jsx';
import NotFound from './pages/NotFound.jsx';
import Navbar from './components/Navbar.jsx';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} /> {/* Fallback for unknown routes */}
    </Routes>
  </Router>
);

export default AppRoutes;
