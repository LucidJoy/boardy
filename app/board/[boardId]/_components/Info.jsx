"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import React from "react";
import { useQuery } from "convex/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Actions from "@/components/Actions";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import Hint from "@/components/Hint";
import { useRenameModal } from "@/store/useRenameModal";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>;
};

const Info = ({ boardId }) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='Go to boards' side='bottom' sideOffset={10}>
        <Button asChild variant='board' className='px-2'>
          <Link href='/'>
            <Image src='/logo.svg' alt='logo' height={40} width={40} />

            <span
              className={cn(
                "font-semibold text-lg ml-2 text-black",
                font.className
              )}
            >
              Boardy
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      <Hint label='Edit title' side='bottom' sideOffset={10}>
        <Button
          variant='board'
          className='text-sm font-normal px-2'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />

      <Actions id={data._id} title={data.title} side='bottom' sideOffset={10}>
        <div>
          <Hint label='Main menu' side='bottom' sideOffset={10}>
            <Button size='icon' variant='board'>
              <Menu className='h-5 w-5' />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;

export const InfoSkeleton = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]' />
  );
};
