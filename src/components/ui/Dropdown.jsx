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
 * @returns {JSX.Element} The rendered IconButton component
 */

const IconDropDown = ({ items, onChange, selected, id }) => {
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const selectedItem = items.find((item) => item.value === selected);
    return selectedItem ? selectedItem.label : "";
  });

  const handleItemClick = (value, label) => {
    // const selectedValue = event.target.value;
    setSelectedLabel(label);
    onChange(value);
  };

  return (
    <div className="icon-dropdown">
      <button className="dropbtn" id={id}>
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
