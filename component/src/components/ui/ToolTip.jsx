import React from "react";
import "../../styles/ui-component.css";

const Tooltip = ({ text, children }) => {
  return text ? (
    <div className="tooltip-container">
      <div className="tooltip">{text}</div>
      {children}
    </div>
  ) : (
    <></>
  );
};

export default Tooltip;
