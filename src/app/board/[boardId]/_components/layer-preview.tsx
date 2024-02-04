"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@root/liveblocks.config";
import React, { memo } from "react";
import Rectangle from "./layers/rectangle";

type LayerPreviewProps = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectedColor?: string;
};

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectedColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectedColor={selectedColor}
          />
        );

      default:
        console.warn("Layer type not supported");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
