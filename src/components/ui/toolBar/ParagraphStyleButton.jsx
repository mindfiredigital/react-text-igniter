import React, { useState } from "react";
import "../../../styles/toolbar-components.css";

/**
 * ParagraphStyleButton Component
 *
 * A button component specifically designed for icons in the toolbar.
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display in the dropdown
 * @param {Function} props.onChange - Function to handle change of selection
 * @param {string} props.selected - Currently selected value
 * @param {string} props.id - Button ID
 * @param {boolean} props.openRight - To show option on the right by default it will be at the bottom
 * @returns {JSX.Element} The rendered ParagraphStyleButton component
 */

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
        {selectedLabel || "Select Value"}
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
