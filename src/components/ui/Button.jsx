import React, { useState } from "react";
import "../../styles/ui-component.css";
import Tooltip from "./ToolTip";

const AppButton = ({ type = "primary", children, onClick, disabled = false }) => {
  const className = `button button-${type}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Icon buttons
const IconButton = ({ children, onClick, id, toolTip, isActive }) => {
  if (isActive) {
    console.log("====================", children, "====================", "isActive =", isActive);
  }
  return (
    <Tooltip text={toolTip}>
      <div className={`toolbarBtnDiv ${isActive ? "active" : ""}`}>
        <button className="toolbarBtn" onClick={onClick} id={id}>
          {children}
        </button>
      </div>
    </Tooltip>
  );
};

const LinkButton = ({ text, url, onEdit, onDelete }) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="link-button-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "inline-block", position: "relative" }}
    >
      <button className="link-button" onClick={handleClick}>
        {text}
      </button>
    
      {hover && (
        <div
          className="link-options"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            minWidth: "80px",
            background: "white",
            border: "1px solid #ccc",
            padding: "4px",
          }}
        >
          <button className="toolbarBtn" onClick={onEdit} id="linkEditBtn">
            Edit
          </button>
          <button className="toolbarBtn" onClick={onDelete} id="linkDelBtn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export { AppButton, IconButton, LinkButton };
