import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 DocAssign
        </Link>

        <div className="nav-menu">
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
            📊 Dashboard
          </Link>
          <Link to="/chat" className={`nav-item ${isActive('/chat')}`}>
            💬 Chat
          </Link>
        </div>

        <div className="nav-user">
          <span className="user-email">{user?.email}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
