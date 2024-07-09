import React from "react";
import "./uiComponents.css";
import {AppButton} from "./buttons";

const ImageUploadSelectionDialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="dialog-header">{title}</div>
        <div className="dialog-body">
          {/* <div className="container">
            <label for="file-input" className="custom-file-input">
              Choose an Image
            </label>
            <input type="file" id="file-input" accept="image/*" />
          </div> */}
        </div>
        <div className="dialog-footer">
          <AppButton type="cancel" onClick={onClose}>
            Cancel
          </AppButton>
          <AppButton onClick={onClose}>Submit</AppButton>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSelectionDialog;
