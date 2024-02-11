"use client";

import React, { useState } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
} from "@/liveblocks.config";

const Canvas = ({ boardId }) => {
  const [canvasState, setCanvasState] = useState({
    mode: "none", //default
    layerType: "Select", //default
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

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
    </main>
  );
};

export default Canvas;
