import React, { useState } from "react";
import "../../styles/ui-component.css";
import * as Icons from "../../assets/icon.jsx";
import Tooltip from "./ToolTip";

/**
 * AppButton Component
 *
 * A reusable button component with customizable type and disabled state.
 *
 * @param {Object} props - Component props
 * @param {string} [props.type="primary"] - Button type (e.g., "primary", "secondary")
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click event handler
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @returns {JSX.Element} The rendered AppButton component
 */
const AppButton = ({ type = "primary", children, onClick, disabled = false }) => {
  const className = `button button-${type}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

/**
 * IconButton Component
 *
 * A button component specifically designed for icons in the toolbar.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content (usually an icon)
 * @param {Function} props.onClick - Click event handler
 * @param {string} props.id - Button ID
 * @returns {JSX.Element} The rendered IconButton component
 */
const IconButton = ({ children, onClick, id, toolTip, isActive }) => {
  if (isActive) {
    console.log("====================", children, "====================", "isActive =", isActive);
  }
  return (
    <Tooltip text={toolTip}>
       <style>
         {`
         .toolbarBtnDiv.active {
            background-color: #ddd; /* Highlighted background color */
            border: 1px solid #333; /* Highlighted border */
          }
          `}
    </style>
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
