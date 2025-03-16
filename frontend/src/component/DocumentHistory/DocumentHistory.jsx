// DocumentHistory.jsx
import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import './DocumentHistory.css';
import axios, { toFormData } from 'axios';

const DocumentHistory = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const fileHistory = [
  //   { id: 1, filename: "Environmental_Policy_2023.pdf", date: "2023-05-12", status: "Completed" },
  //   { id: 2, filename: "Human_Rights_Act.docx", date: "2023-04-28", status: "Completed" },
  //   { id: 3, filename: "NGO_Guidelines.pdf", date: "2023-03-15", status: "Completed" },
  // ];
  const [fileHistory,setFileHistory] = useState([])

  const fetchUserDocs = async() =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append('id',user.id)
    const response = await axios.post(apiUrl+"users/history/",formData,{
      headers:{
        Authorization:`Token ${authToken}`
      }
    })
    setFileHistory(response.data)

  }
  useEffect(()=>{
    fetchUserDocs();
  },[])

  return (
    <div className="history-card">
      <div className="card-header">
        <h2 className="card-title">
          <History size={20} />
          Document History
        </h2>
        <p className="card-description">
          Previously processed documents and their summaries
        </p>
      </div>
      <div className="card-content">
        <table className="history-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Date Processed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileHistory.map((file) => (
              <tr key={file.id}>
                <td>{file.filename}</td>
                <td>{file.date}</td>
                <td>
                  <span className="status">{file.status}</span>
                </td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <button className="load-more-btn">Load More</button>
      </div>
    </div>
  );
};

export default DocumentHistory;