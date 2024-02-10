"use client";

import React from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

import { useSelf } from "@/liveblocks.config";

const Canvas = ({ boardId }) => {
  const { name, picture } = useSelf((me) => me.info);

  console.log(name, picture);

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info />

      <Participants />

      <Toolbar />
    </main>
  );
};

export default Canvas;
