"use client";

import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";

import { RoomProvider } from "@/liveblocks.config";

const Room = ({ children, roomId, fallback }) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
