import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-content">
          <h2 className="logo">📚 DocAssign</h2>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/chat" className="nav-link">Chat</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Document Intelligence & <span className="gradient-text">Knowledge Search Hub</span>
          </h1>
          <p className="hero-subtitle">
            Upload your documents, extract insights, and get AI-powered answers based strictly on your content
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-primary btn-lg">
                  Go to Dashboard
                </Link>
                <Link to="/chat" className="btn-secondary btn-lg">
                  Start Chatting
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-secondary btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>Your documents are private and secure with JWT-based authentication</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Smart Document Processing</h3>
            <p>Upload PDF and TXT files with automatic text extraction</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Answers</h3>
            <p>Get accurate answers grounded strictly in your document content</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Source References</h3>
            <p>Every answer includes references to the source documents</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Chat Interface</h3>
            <p>Intuitive chat-style Q&A with full conversation history</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Processing</h3>
            <p>Fast document processing with live status updates</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in seconds</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Documents</h3>
            <p>Upload your PDF or TXT files</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Ask Questions</h3>
            <p>Get AI-powered answers from your documents</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 DocAssign. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default Home;
