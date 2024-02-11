"use client";

import React, { useCallback, useState } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "@/liveblocks.config";
import CursorsPresence from "./CursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const Canvas = ({ boardId }) => {
  const [canvasState, setCanvasState] = useState({
    mode: "none", //default
    layerType: "Select", //default
  });

  const [camera, setCamera] = useState({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e, camera);

    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }, e) => {
    setMyPresence({ cursor: null });
  }, []);

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

      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
