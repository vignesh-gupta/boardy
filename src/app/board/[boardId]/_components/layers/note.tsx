import { cn, colorToCss, getContrastingColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@root/liveblocks.config";
import { Kalam } from "next/font/google";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { fill, height, width, x, y, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
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
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <div
        className={cn(
          "h-full w-full flex flex-col flex-wrap items-center justify-center text-center p-3",
          font.className
        )}
        style={{
          color: fill ? getContrastingColor(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      >
        <div
          onChange={handleContentChange}
          contentEditable
          className="w-full max-h-full overflow-hidden outline-none"
        >
          {value ?? "Text"}
        </div>
      </div>
    </foreignObject>
  );
};

export default Note;
