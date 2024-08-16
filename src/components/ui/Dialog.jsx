import React, { useEffect, useState } from "react";
import "../../styles/ui-component.css";
import { AppButton, IconButton } from "./Button.jsx";
import * as Icons from "../../assets/icon.jsx";

const ImageUploadSelectionDialog = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
}) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // valid extensions for image and video.
  const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const validVideoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"];

  // Reset dialog state when it is opened
  useEffect(() => {
    if (isOpen) {
      resetToDefault();
    }
  }, [isOpen]);

  const closeDialog = () => {
    resetToDefault();
    onClose();
  };

  const resetToDefault = () => {
    setImageUrl("");
    setFile(null);
    setError("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (
        validImageExtensions.includes(fileExtension) ||
        validVideoExtensions.includes(fileExtension)
      ) {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        setError("Invalid file type. Please select an image or video file.");
      }
    }
  };

  const handleImageUrl = (event) => {
    const url = event.target.value;
    const urlExtension = url.split(".").pop().split("?")[0].toLowerCase();
    if (
      validImageExtensions.includes(urlExtension) ||
      validVideoExtensions.includes(urlExtension)
    ) {
      setImageUrl(url);
      setFile(null);
      setError("");
    } else {
      setImageUrl("");
      setError("Invalid URL. Please provide a link to an image or video.");
    }
  };

  const handleSubmit = () => {
    if (file || imageUrl) {
      onSubmit({ file, imageUrl });
      onClose();
    } else {
      setError("Please select a file or image url");
    }
  };

  if (!isOpen) return null;

  return (
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
              placeholder="Paste file URL"
              value={imageUrl}
              onChange={handleImageUrl}
            />
            <div className="or-divider">OR</div>
            <label htmlFor="file-input" className="custom-file-input">
              {!file ? "Select file" : "Reselect file"}
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {file && (
              <div className="file-info">
                <p>Selected file: {file.name} </p>
                <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <div className="dialog-footer">
          <AppButton type="cancel" onClick={closeDialog}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit}>Submit</AppButton>
        </div>
      </div>
    </div>
  );
};

const FileUrlDialog = ({ isOpen, onClose, onSubmit, title, children }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const closeDialog = () => {
    resetToDefault();
    onClose();
  };

  const resetToDefault = () => {
    setUrl("");
    setError("");
  };

  const handleImageUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    if (url) {
      onSubmit(url);
      onClose();
    } else {
      setError("Please provide file url");
    }
  };

  if (!isOpen) return null;

  return (
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
              value={url}
              onChange={handleImageUrl}
            />
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <div className="dialog-footer">
          <AppButton type="cancel" onClick={closeDialog}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit}>Submit</AppButton>
        </div>
      </div>
    </div>
  );
};

export { ImageUploadSelectionDialog, FileUrlDialog };
