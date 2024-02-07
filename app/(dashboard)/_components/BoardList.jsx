"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import EmptySearch from "./EmptySearch";
import EmptyFavorites from "./EmptyFavorites";
import EmptyBoards from "./EmptyBoards";
import BoardCard from "./boardcard";
import NewBoardButton from "./NewBoardButton";

const BoardList = ({ orgId, query }) => {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div>
        <h3 className='text-3xl font-medium'>
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h3 className='text-3xl font-medium'>
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        <NewBoardButton orgId={orgId} />

        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
