import React from "react";
import "../../styles/ui-component.css";
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
const AppButton = ({
  type = "primary",
  children,
  onClick,
  disabled = false,
}) => {
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
const IconButton = ({ children, onClick, id, toolTip }) => {
  return (
    <Tooltip text={toolTip}>
      <div className="toolbarBtnDiv">
        <button className="toolbarBtn" onClick={onClick} id={id}>
          {children}
        </button>
      </div>
    </Tooltip>
  );
};

export { AppButton, IconButton };