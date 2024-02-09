import React from "react";

import Room from "@/components/Room";
import Canvas from "./_components/Canvas";
import Loading from "./_components/Loading";

const BoardIdPage = ({ params }) => {
  return <Loading />;

  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
