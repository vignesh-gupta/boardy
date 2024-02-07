import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";
import React from "react";

type RectangleProps = {
  id: string;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  layer: RectangleLayer;
  selectionColor?: string;
};

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: RectangleProps) => {
  const { x, y, fill, height, type, width } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Rectangle;
