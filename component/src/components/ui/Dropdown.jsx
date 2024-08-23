import React, { useState } from "react";
import "../../styles/ui-component.css";
import Tooltip from "./ToolTip";

const IconDropDown = ({ items, onChange, icon, id, openRight,toolTip }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value) => {
    onChange(value);
    // Close the dropdown after item selection.
    setIsOpen(false);
  };

  return (

    <div className={`icon-dropdown ${openRight ? "open-right" : ""}`}>
          <Tooltip text={toolTip}>
      <button className="dropbtn" id={id} onClick={handleButtonClick}>
        {/* Render the consistent icon on the button */}
        {icon}
      </button>
      </Tooltip>
      {isOpen && (
        <div className="icon-dropdown-content">
          {items.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleItemClick(item.value)}
            >
              {item.icon && <span className="dropdown-icon">{item.icon}</span>}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { IconDropDown };
