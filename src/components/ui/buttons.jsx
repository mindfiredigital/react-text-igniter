import React from "react";
import "./uiComponents.css";

const AppButton = ({ type = "primary", children, onClick, disabled = false }) => {
  const className = `button button-${type}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const IconButton = ({ children, onClick, id }) => {
  return (
    <button onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export { AppButton, IconButton };
