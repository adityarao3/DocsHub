import { useState, useEffect } from "react";

const DocumentList = ({ documents, onDelete, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const hasProcessing = documents.some((doc) => doc.status === "processing");

    if (hasProcessing) {
      const interval = setInterval(() => {
        onRefresh();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [documents, onRefresh]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const getStatusBadge = (status) => {
    const badges = {
      processing: {
        text: "Processing",
        className: "status-processing",
        icon: "⏳",
      },
      completed: {
        text: "Completed",
        className: "status-completed",
        icon: "✅",
      },
      failed: { text: "Failed", className: "status-failed", icon: "❌" },
    };

    const badge = badges[status] || badges.processing;

    return (
      <span className={`status-badge ${badge.className}`}>
        <span className="status-icon">{badge.icon}</span>
        {badge.text}
      </span>
    );
  };

  const getFileIcon = (fileType) => {
    return fileType === "pdf" ? "📕" : "📄";
  };

  if (documents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No documents yet</h3>
        <p>Upload your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="document-list">
      <div className="list-header">
        <button
          onClick={handleRefresh}
          className={`btn-refresh ${refreshing ? "refreshing" : ""}`}
          title="Refresh list"
        >
          🔄
        </button>
      </div>

      <div className="documents-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <div className="document-icon">{getFileIcon(doc.fileType)}</div>
              <div className="document-info">
                <h3 className="document-name" title={doc.fileName}>
                  {doc.fileName}
                </h3>
                <p className="document-meta">
                  {formatFileSize(doc.fileSize)} • {formatDate(doc.createdAt)}
                </p>
              </div>
            </div>

            <div className="document-status">{getStatusBadge(doc.status)}</div>

            {doc.errorMessage && (
              <div className="document-error">
                <p className="error-text">{doc.errorMessage}</p>
              </div>
            )}

            <div className="document-actions">
              <button
                onClick={() => onDelete(doc.id)}
                className="btn-delete"
                title="Delete document"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
