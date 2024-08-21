import React from "react";
import "../../styles/ui-component.css";

const Tooltip = ({ text, children }) => {

  return text ? (
    <div className="tooltip-container">
      {children}
      <div className="tooltip">{text}</div>
    </div>
  ) : (
    <></>
  );
};

export default Tooltip;
