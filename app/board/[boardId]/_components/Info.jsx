import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Info = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      TODO: Info about the board
    </div>
  );
};

export default Info;

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]' />
  );
};