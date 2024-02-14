"use client";

import React, { useCallback, useMemo, useState } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";

import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import CursorsPresence from "./CursorsPresence";
import {
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import LayerPreview from "./LayerPreview";
import SelectionBox from "./SelectionBox";
import SelectionTools from "./SelectionTools";

const MAX_LAYERS = 100;

const Canvas = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState({
    mode: "none", //default
    layerType: "Select", //default
  });

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState({ r: 0, g: 0, b: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    ({ storage, setMyPresence }, layerType, position) => {
      const liveLayers = storage.get("layers");
      // console.log("ll ", liveLayers);
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });

      setCanvasState({ mode: "none" });
    },
    [lastUsedColor]
  );

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point) => {
      if (canvasState.mode !== "translating") return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer)
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
      }

      setCanvasState({ mode: "translating", current: point });
    },
    [canvasState]
  );

  const unSelectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0)
      setMyPresence({ selection: [] }, { addToHistory: true });
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current, origin) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: "selectionNet",
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const startMultiSelection = useCallback((current, origin) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      console.log("selectionnet");
      setCanvasState({ mode: "selectionNet", origin, current });
    }
  }, []);

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point) => {
      if (canvasState.mode !== "resizing") return;

      // FIXME  initialBounds
      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner, initialBounds) => {
      // console.log({ corner, initialBounds });

      history.pause();
      setCanvasState({ mode: "resizing", initialBounds, corner });
    },
    [history]
  );

  const onWheel = useCallback((e) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === "pressing") {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === "selectionNet") {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === "translating") {
        // console.log("Translating");
        translateSelectedLayers(current);
      } else if (canvasState.mode === "resizing") {
        // console.log("resizing");
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [canvasState, resizeSelectedLayer, camera, translateSelectedLayers]
  );

  const onPointerLeave = useMutation(({ setMyPresence }, e) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === "inserting") return;

      //TODO add case for drawing

      setCanvasState({ origin: point, mode: "pressing" });
    },
    [camera, canvasState.mode, setCanvasState]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === "none" || canvasState.mode === "pressing") {
        unSelectLayers();
        setCanvasState({ mode: "none" });
      } else if (canvasState.mode === "inserting") {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: "none" });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, unSelectLayers]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e, layerId) => {
      if (canvasState.mode === "Pencil" || canvasState.mode === "Inserting") {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: "translating", current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />

      <Participants />

      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />

      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}

          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === "selectionNet" &&
            canvasState.current != null && (
              <rect
                className='fill-blue-500/5 stroke-blue-500 stroke-1'
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}

          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
