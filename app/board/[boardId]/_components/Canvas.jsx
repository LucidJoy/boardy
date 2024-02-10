"use client";

import React from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

import { useSelf } from "@/liveblocks.config";

const Canvas = ({ boardId }) => {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />

      <Participants />

      <Toolbar />
    </main>
  );
};

export default Canvas;
