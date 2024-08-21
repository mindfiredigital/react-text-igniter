import React, { useState } from "react";
import "../../../styles/toolbar-components.css";


const ParagraphStyleButton = ({ items, onChange, selected, id, openRight }) => {
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const selectedItem = items.find((item) => item.value === selected);
    return selectedItem ? selectedItem.label : "";
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value, label) => {
    setSelectedLabel(label);
    onChange(value);
    // Close after item selection
    setIsOpen(false);
  };

  return (
    <div className={`icon-dropdown ${openRight ? "open-right" : ""}`}>
      <button className={`dropbtn ${selected}`} id={id} onClick={handleButtonClick}>
        {selectedLabel || "Select Style"}
      </button>
      {isOpen && (
        <div className="icon-dropdown-content">
          {items.map((item, index) => (
            <div className="dropdown-item">
              <div
                key={index}
                className={`${item.value}`}
                onClick={() => handleItemClick(item.value, item.label)}
              >
                {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ParagraphStyleButton };
