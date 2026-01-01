import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { documentAPI } from '../services/api';
import DocumentUpload from '../components/DocumentUpload';
import DocumentList from '../components/DocumentList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentAPI.getAll();
      setDocuments(response.data.documents);
      setError('');
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadDocuments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await documentAPI.delete(id);
      loadDocuments();
    } catch (err) {
      alert('Failed to delete document');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📚 Document Dashboard</h1>
          <div className="header-actions">
            <span className="user-email">{user?.email}</span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="upload-section">
            <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="documents-section">
            <div className="section-header">
              <h2>Your Documents</h2>
              <span className="document-count">
                {documents.length} {documents.length === 1 ? 'document' : 'documents'}
              </span>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading documents...</p>
              </div>
            ) : (
              <DocumentList documents={documents} onDelete={handleDelete} onRefresh={loadDocuments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
