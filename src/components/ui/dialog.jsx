import React, { useState } from "react";
import "./uiComponents.css";
import { AppButton, IconButton } from "./buttons";
import * as Icons from "../../assets/Icons";

const ImageUploadSelectionDialog = ({ isOpen, onClose, title, children }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value);
    setFile(null);
  }

  const handleSubmit = () => {
    if(file || imageUrl){
      console.log({file, imageUrl});
      onClose();
    } else {
      setError("Please select a file or image url")
    }
  }

  if (!isOpen) return null;

  return (
    // background of dialog
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          {title}
          <IconButton onClick={onClose} id="dialogClose">
            <Icons.CloseIcon />
          </IconButton>
        </div>
        <div className="dialog-body">
          <div className="container">
            <input
              type="text"
              className="image-url-input"
              placeholder="Paste image URL"
              value={imageUrl}
              onChange={handleImageUrl}
            />
            <div className="or-divider">OR</div>
            {error && <p className="error">{error}</p>}
            <label htmlFor="file-input" className="custom-file-input">
              Choose an Image
            </label>
            <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
            {file && (
              <div className="file-info">
                <p>Selected file: {file.name}</p>
                <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </div>
        </div>
        <div className="dialog-footer">
          <AppButton type="cancel" onClick={onClose}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit}>Submit</AppButton>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSelectionDialog;
