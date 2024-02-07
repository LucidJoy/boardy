"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./Overlay";
import { useAuth } from "@clerk/nextjs";
import Footer from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden transition'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127]rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
