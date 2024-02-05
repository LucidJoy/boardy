"use client";

import React from "react";
import EmptySearch from "./EmptySearch";
import EmptyFavorites from "./EmptyFavorites";
import EmptyBoards from "./EmptyBoards";

const BoardList = ({ orgId, query }) => {
  const data = []; //change to API call

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      BoardList
      {JSON.stringify(query)}
    </div>
  );
};

export default BoardList;
