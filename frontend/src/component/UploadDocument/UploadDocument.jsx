// UploadDocument.jsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './UploadDocument.css';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const toast = ({ title, description, variant }) => {
    console.log(`${title}: ${description} ${variant ? `(${variant})` : ''}`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a document to process",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          toast({
            title: "Processing complete",
            description: "Your document has been analyzed successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="upload-card">
      <div className="card-header">
        <h2 className="card-title">
          <Upload size={20} />
          Upload Legal Document
        </h2>
        <p className="card-description">
          Upload a legal document to get a simplified summary
        </p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="upload-area">
            <label htmlFor="document" className="upload-label">
              <Upload size={32} />
              <span>{file ? file.name : 'Click to select or drag and drop'}</span>
              <span className="upload-info">Supports PDF, DOCX, and TXT (Max 10MB)</span>
            </label>
            <input 
              id="document" 
              type="file" 
              className="upload-input"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileChange}
            />
          </div>
          
          {processing && (
            <div className="progress-section">
              <div className="progress-header">
                <span>Processing document...</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!file || processing}
          >
            {processing ? 'Processing...' : 'Analyze Document'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;