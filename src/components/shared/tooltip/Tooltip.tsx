import React, { useState } from "react";
import "./Tooltip.css";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {
        isVisible && <div className="tooltip">{content}</div>
      }
    </div>
  );
};

export default Tooltip;
