import React, { useState } from 'react';
import './visualize.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`card ${className || ''}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`button ${className || ''}`}>
    {children}
  </button>
);

const Visualize = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: '' });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadStatus({ success: false, message: '' });

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      setUploadStatus({ success: true, message: 'File uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus({ success: false, message: 'Error uploading file. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewResults = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="container">
      <Card className="w-full mb-20">
        <CardHeader>
          <h2 className="title">CSV Data Visualization</h2>
        </CardHeader>
        <CardContent>
          <div className="info-box">
            <div className="info-header">
              <svg className="icon" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="info-title">How it works</p>
            </div>
            <p className="info-text">
              Upload your CSV file containing data you want to visualize. Our system will process the file and generate interactive visualizations for you to explore on the dashboard.
            </p>
          </div>
          
          <div className="upload-section">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input"
              id="file-upload"
              disabled={isUploading}
            />
            <label htmlFor="file-upload" className={`file-label ${isUploading ? 'uploading' : ''}`}>
              <svg className="upload-icon" viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {isUploading ? 'Uploading...' : 'Upload CSV File'}
            </label>
            
            {uploadStatus.message && (
              <div className={`status-message ${uploadStatus.success ? 'success' : 'error'}`}>
                <svg className="status-icon" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="status-text">{uploadStatus.success ? 'Success' : 'Error'}: </span>
                {uploadStatus.message}
              </div>
            )}
            
            {uploadStatus.success && (
              <Button 
                onClick={handleViewResults}
                className="view-results-button"
              >
                View Results
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="subtitle">Supported Visualizations</h3>
        </CardHeader>
        <CardContent>
          <ul className="visualization-list">
            <li>Line charts for time-series data</li>
            <li>Bar charts for comparing categories</li>
            <li>Scatter plots for correlation analysis</li>
            <li>Pie charts for composition breakdown</li>
            <li>Heatmaps for multi-dimensional data</li>
          </ul>
          <p className="description">
            Our system automatically detects the best visualization types based on your data structure. You can customize and interact with these visualizations on the dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visualize;