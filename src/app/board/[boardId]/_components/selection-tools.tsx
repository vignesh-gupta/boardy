"use client";

import { useSelectionBounds } from "@/lib/hooks/use-selection-bound";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@root/liveblocks.config";
import { memo } from "react";
import ColorPicker from "./color-picker";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { useDeleteLayers } from "@/lib/hooks/use-delete-layers";
import { Trash2 } from "lucide-react";

type SelectionToolsProps = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute flex p-3 bg-white border shadow-sm select-none rounded-xl"
        style={{
          transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
            )`,
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
