import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Participants = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      List of users
    </div>
  );
};

export default Participants;

export const ParticipantsSkeleton = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]' />
  );
};
