// DocumentViewer.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DocumentViewer.css";

const DocumentViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadedFile, ocrResult } = location.state || {};

  // Function to determine file preview
  const renderFilePreview = (file) => {
    if (!file) return <p className="no-content">No document uploaded</p>;

    const fileUrl = URL.createObjectURL(file);
    const fileType = file.type.toLowerCase();

    if (fileType === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          title="Document Preview"
          className="file-preview"
        />
      );
    } else if (fileType.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt="Document Preview"
          className="file-preview"
        />
      );
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <p className="preview-message">
          Word document preview not supported. File: {file.name}
        </p>
      );
    } else if (fileType === "text/plain") {
      return (
        <p className="preview-message">
          Text file preview not supported directly. File: {file.name}
        </p>
      );
    } else {
      return (
        <p className="preview-message">
          Preview not available for this file type: {file.name}
        </p>
      );
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the upload page
  };

  return (
    <div className="viewer-container">
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
      <div className="split-pane">
        {/* Left Pane - Uploaded Document */}
        <div className="pane left-pane">
          <div className="pane-header">
            <h2 className="pane-title">Uploaded Document</h2>
            <p className="pane-description">Original document preview</p>
          </div>
          <div className="pane-content">
            {uploadedFile ? (
              <div className="document-preview">
                <p className="file-name">{uploadedFile.name}</p>
                {renderFilePreview(uploadedFile)}
              </div>
            ) : (
              <p className="no-content">No document uploaded</p>
            )}
          </div>
        </div>

        {/* Right Pane - OCR Result */}
        <div className="pane right-pane">
          <div className="pane-header">
            <h2 className="pane-title">OCR Analysis</h2>
            <p className="pane-description">Extracted text from the document</p>
          </div>
          <div className="pane-content">
            {ocrResult ? (
              <div className="ocr-result">
                <pre className="ocr-text">{ocrResult}</pre>
              </div>
            ) : (
              <p className="no-content">No OCR results available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;