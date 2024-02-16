"use client";

import { useStorage } from "@/liveblocks.config";
import React, { memo } from "react";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Text from "./Text";
import Note from "./Note";
import Path from "./Path";
import { colorToCss } from "@/lib/utils";

const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }) => {
  const layer = useStorage((root) => root.layers.get(id));

  // console.log({ layer });

  if (!layer) return null;

  switch (layer.type) {
    case "Path":
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      );

    case "Note":
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    case "Text":
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    case "Ellipse":
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

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
