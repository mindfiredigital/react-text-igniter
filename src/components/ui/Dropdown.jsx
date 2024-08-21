import React, { useState } from "react";
import "../../styles/ui-component.css";

/**
 * IconButton Component
 *
 * A button component specifically designed for icons in the toolbar.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content (usually an icon)
 * @param {Function} props.onClick - Click event handler
 * @param {string} props.id - Button ID
 * @param {string} props.openRight - To show option on right by default it will be at bottom.
 * @returns {JSX.Element} The rendered IconButton component
 */

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
    setSelectedLabel(label);
    onChange(value);
    //close after item selection.
    setIsOpen(false);
  };

  return (
    // this same button can be used as inline button and can be opened on the right side.
    <div className={`icon-dropdown ${openRight ? "open-right" : ""}`}>
      <button className="dropbtn" id={id} onClick={handleButtonClick}>
        {selectedLabel || "Select Value"}
      </button>
      {isOpen && ( // render the dropdown content
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
      )}
    </div>
  );
};

export { IconDropDown };
