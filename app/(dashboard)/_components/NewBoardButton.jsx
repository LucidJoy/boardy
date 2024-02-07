"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const NewBoardButton = ({ orgId, disabled }) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then(() => {
        toast.success("Board created");
      })
      .catch((err) => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={handleClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6 transition",
        disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div></div>
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-medium'>New board</p>
    </button>
  );
};

export default NewBoardButton;
