import { useState } from "react";
import { documentAPI } from "../services/api";

const DocumentUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF and TXT files are allowed");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setProgress(0);

      await documentAPI.upload(file, (percent) => {
        setProgress(percent);
      });

      setFile(null);
      setProgress(0);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="upload-card">
      <h2>📤 Upload Document</h2>
      <p className="upload-description">
        Upload PDF or TXT files to extract and analyze content
      </p>

      <div
        className={`drop-zone ${dragActive ? "drag-active" : ""} ${
          file ? "has-file" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="file-info">
            <div className="file-icon">📄</div>
            <div className="file-details">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="btn-remove"
              disabled={uploading}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <div className="upload-icon">📁</div>
            <p className="upload-text">Drag and drop your file here</p>
            <p className="upload-subtext">or</p>
            <label htmlFor="file-input" className="btn-select-file">
              Choose File
            </label>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p className="upload-hint">Supported: PDF, TXT (Max 10MB)</p>
          </>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {uploading && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="progress-text">{progress}%</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="btn-primary btn-upload"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
};

export default DocumentUpload;
