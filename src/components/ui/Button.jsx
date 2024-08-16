import React from "react";
import "../../styles/ui-component.css";
import Tooltip from "./ToolTip";

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

const IconButton = ({ children, onClick, id, toolTip, isActive }) => {
  if (isActive) {
    console.log(
      "====================",
      children,
      "====================",
      "isActive =",
      isActive
    );
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

export { AppButton, IconButton };
