import React, { useState } from "react";
import "../../styles/ui-component.css";

const IconDropDown = ({ items, onChange, selected, id, openRight }) => {
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const selectedItem = items.find((item) => item.value === selected);
    return selectedItem ? selectedItem.label : "";
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value, label) => {
    // const selectedValue = event.target.value;
    setSelectedLabel(label);
    onChange(value);
    // if needed to close after item selection.
    // setIsOpen(false);
  };

  return (
    <div className={`icon-dropdown ${openRight ? "open-right" : ""}`}>
      <button className="dropbtn" id={id} onClick={handleButtonClick}>
        {selectedLabel || "Select..."}
      </button>
      <div className="icon-dropdown-content">
        {items.map((item, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleItemClick(item.value, item.label)}
          >
            {item.icon && <span className="dropdown-icon">{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export { IconDropDown };
