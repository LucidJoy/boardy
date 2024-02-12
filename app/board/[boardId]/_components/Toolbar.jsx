import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import ToolButton from "./ToolButton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolButton
          label='Select'
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: "none", layerType: "Select" })}
          isActive={
            canvasState.mode ===
              ("none" ||
                "translating" ||
                "selectionNet" ||
                "pressing" ||
                "resizing") && canvasState.layerType === "Select"
          }
        />
        <ToolButton
          label='Text'
          icon={Type}
          onClick={() =>
            setCanvasState({ mode: "inserting", layerType: "Text" })
          }
          isActive={
            canvasState.mode === "inserting" && canvasState.layerType === "Text"
          }
        />
        <ToolButton
          label='Sticky Note'
          icon={StickyNote}
          onClick={() =>
            setCanvasState({ mode: "inserting", layerType: "Note" })
          }
          isActive={
            canvasState.mode === "inserting" && canvasState.layerType === "Note"
          }
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() =>
            setCanvasState({ mode: "inserting", layerType: "Rectangle" })
          }
          isActive={
            canvasState.mode === "inserting" &&
            canvasState.layerType === "Rectangle"
          }
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() =>
            setCanvasState({ mode: "inserting", layerType: "Ellipse" })
          }
          isActive={
            canvasState.mode === "inserting" &&
            canvasState.layerType === "Ellipse"
          }
        />

        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() => setCanvasState({ mode: "pencil" })}
          isActive={canvasState.mode === "Pencil"}
        />
      </div>

      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export default Toolbar;

export const ToolbarSkeleton = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md' />
  );
};
