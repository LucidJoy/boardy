"use client";

import { useStorage } from "@/liveblocks.config";
import React, { memo } from "react";
import Rectangle from "./Rectangle";

const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }) => {
  const layer = useStorage((root) => root.layers.get(id));

  console.log({ layer });

  if (!layer) return null;

  switch (layer.type) {
    case "Rectangle":
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    default:
      console.log("UNKOWN LAYER TYPE");
      return null;
  }
});

export default LayerPreview;

LayerPreview.displayName = "LayerPreview";
