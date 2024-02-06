"use client";

import React from "react";
import { useMutation } from "convex/react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => toast.success("Board created"))
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' height={110} width={110} alt='empty' />

      <h2 className='text-2xl font-semibold mt-6'>Create your first board!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>

      <div className='mt-6'>
        <Button disabled={pending} onClick={handleClick} size='lg'>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
