"use client";

import React from "react";
import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import Hint from "@/components/Hint";
import { cn } from "@/lib/utils";

const Item = ({ id, name, imageUrl }) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className='aspect-square relative'>
      <Hint label={name} side='right' align='start' sideOffset={18}>
        <Image
          src={imageUrl}
          fill
          alt={name}
          onClick={handleClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100 border-[2px] border-[#1C1C1E]"
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
