import React, { useState, useEffect, useCallback } from 'react';
import './FileUploader.css';

// Helper to get a simple icon based on file type
const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return '🖼️'; // Image icon
  if (fileType.startsWith('video/')) return '🎞️'; // Video icon
  if (fileType.startsWith('audio/')) return '🎵'; // Audio icon
  if (fileType === 'application/pdf') return '📄'; // PDF icon
  if (fileType.startsWith('text/')) return '📝'; // Text icon
  return '📁'; // Generic file icon
};

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || event.dataTransfer.files);
    processFiles(files);
    if (event.dataTransfer) event.dataTransfer.clearData();
  };

  const processFiles = (files) => {
    const newFileObjects = files.map(file => ({
      fileObject: file,
      name: file.name,
      type: file.type,
      size: file.size,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      id: Date.now() + Math.random().toString(36).substring(2, 15) // Unique ID
    }));

    setSelectedFiles(prevFiles => [...prevFiles, ...newFileObjects]);
  };

  const removeFile = (fileIdToRemove) => {
    setSelectedFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileIdToRemove);
      if (fileToRemove && fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prevFiles.filter(file => file.id !== fileIdToRemove);
    });
  };

  // Drag and Drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e);
    }
  }, [handleFileChange]);


  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach(fileObj => {
        if (fileObj.previewUrl) {
          URL.revokeObjectURL(fileObj.previewUrl);
        }
      });
    };
  }, [selectedFiles]);

  return (
    <div className={`file-uploader-container ${dragActive ? 'drag-active' : ''}`}
         onDragEnter={handleDrag}
         onDragOver={handleDrag}
         onDragLeave={handleDrag}
         onDrop={handleDrop}
    >
      <div className="file-input-area">
        <input
          type="file"
          id="fileUpload"
          multiple
          onChange={handleFileChange}
          className="file-input-native"
        />
        <label htmlFor="fileUpload" className="file-input-label">
          <span className="input-icon">✨</span>
          <span className="input-text">Choose Files or Drag & Drop Here</span>
        </label>
        {dragActive && <div className="drag-overlay">Drop files here!</div>}
      </div>

      {selectedFiles.length > 0 && (
        <div className="file-preview-container">
          <h3 className="preview-title">Selected Files:</h3>
          <div className="file-preview-grid">
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="file-preview-item">
                <button className="remove-file-btn" onClick={() => removeFile(fileObj.id)} title="Remove file">
                  ×
                </button>
                {fileObj.previewUrl ? (
                  <img src={fileObj.previewUrl} alt={`Preview of ${fileObj.name}`} className="file-image-preview" />
                ) : (
                  <div className="file-icon-placeholder">
                    <span className="file-icon">{getFileIcon(fileObj.type)}</span>
                    <span className="file-extension">{fileObj.name.split('.').pop().toUpperCase()}</span>
                  </div>
                )}
                <div className="file-info">
                  <p className="file-name" title={fileObj.name}>{fileObj.name}</p>
                  <p className="file-size">{(fileObj.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;