import { colorToCss } from "@/lib/utils";
import React from "react";

const Rectangle = ({ id, layer, onPointerDown, selectionColor }) => {
  // console.log({ id, layer });

  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
