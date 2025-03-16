// UploadDocument.jsx
import React, { useState } from "react";
import { Upload } from "lucide-react";
import "./UploadDocument.css";
import axios from "axios";
import { toast } from "react-toastify";

const UploadDocument = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const toastModel = ({ title, description, variant }) => {
    console.log(`${title}: ${description} ${variant ? `(${variant})` : ""}`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
// handle file upload
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!file) {
      toastModel({
        title: "No file selected",
        description: "Please select a document to process",
        variant: "destructive",
      });
      toast.error("Please select a document to process", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setProcessing(true);
    setProgress(0);
    const authToken = localStorage.getItem("authToken");

// check for auth token
      if (!authToken) {
        toast.error("Authentication token not found. Please log in.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      const formData = new FormData();
      const user = localStorage.getItem("user")
      
      const userid = JSON.parse(localStorage.getItem("user"))
      formData.append("file", file);
      
      // formData.append("id",userid)
      const response = await axios.post(apiUrl + "users/upload/",formData,{
        headers:{
          "Authorization":`Token ${authToken}`,
          "Content-Type" : "multipart/form-data"
        }
      });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          toast.success("Your document has been analyzed successfully",{
            position:'top-right',
            autoClose:3000
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
              <span>
                {file ? file.name : "Click to select or drag and drop"}
              </span>
              <span className="upload-info">
                Supports PDF, DOCX, and TXT (Max 10MB)
              </span>
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
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={!file || processing}
            onChange={(e) => handleFileChange(e)}
            onClick={(e) => handleSubmit(e)}
          >
            {processing ? "Processing..." : "Analyze Document"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
