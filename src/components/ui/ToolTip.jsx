import React, { useState } from "react";
import "../../styles/ui-component.css";

const Tooltip = ({ text, children }) => {
  //const [visible, setVisible] = useState(false);

//   const showTooltip = () => setVisible(true);
//   const hideTooltip = () => setVisible(false);

  return (
    <div className="tooltip-container" >
      {children}
      {true && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
