import { Kalam } from "next/font/google";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@root/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"]
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.3;

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

type TextProps = {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const { fill, height, width, x, y, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    debugger;

    const layer = storage.get("layers");

    layer.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none"
      }}
    >
      <div
        className={cn(
          "h-full w-full flex flex-col flex-wrap items-center justify-center text-center overflow-visible",
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#000",
          fontSize: calculateFontSize(width, height)
        }}
      >
        <ContentEditable
          html={value ?? "Text"}
          onChange={handleContentChange}
          className={cn(
            "max-h-full max-w-full flex items-center text-wrap flex-wrap justify-center text-center drop-shadow-md outline-none overflow-visible",
            font.className
          )}
          style={{
            fontSize: calculateFontSize(width, height),
            color: fill ? colorToCss(fill) : "#000"
          }}
        />
      </div>
    </foreignObject>
  );
};

export default Text;
