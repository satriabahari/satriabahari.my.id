"use client";

import React from "react";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string = "#FACC15", percent: number): string => {
  let color = (hex || "#FACC15").startsWith("#") ? hex.slice(1) : hex;

  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(color, 16);
  if (isNaN(num)) return hex;

  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "#FACC15",
  size = 1,
  items = [],
  className = "",
}) => {
  const maxItems = 3;

  const papers = Array.from({ length: maxItems }, (_, i) => items[i] || null);

  const folderBackColor = darkenColor(color, 0.08);
  const paperColors = [
    darkenColor("#ffffff", 0.1),
    darkenColor("#ffffff", 0.05),
    "#ffffff",
  ];

  const scaleStyle = { transform: `scale(${size})` };

  const paperTransforms = [
    "translate(-120%, -70%) rotate(-15deg)",
    "translate(10%, -70%) rotate(15deg)",
    "translate(-50%, -100%) rotate(5deg)",
  ];

  return (
    <div style={scaleStyle} className={`inline-block ${className}`}>
      <div className="relative transition-all duration-200 ease-in">
        <div
          className="relative h-[80px] w-[100px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute bottom-[98%] left-0 h-[10px] w-[30px] rounded-tl-[5px] rounded-tr-[5px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {papers.map((item, i) => (
            <div
              key={i}
              className="absolute bottom-[10%] left-1/2 z-20 h-[75%] w-[85%]"
              style={{
                transform: paperTransforms[i],
                backgroundColor: paperColors[i],
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              {item}
            </div>
          ))}

          <div
            className="absolute z-30 h-full w-full origin-bottom"
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              transform: "skew(15deg) scaleY(0.6)",
            }}
          ></div>
          <div
            className="absolute z-30 h-full w-full origin-bottom"
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              transform: "skew(-15deg) scaleY(0.6)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
