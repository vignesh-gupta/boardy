"use client";

import React from "react";
import EmptySearch from "./empty-state/empty-search";
import EmptyFavorites from "./empty-state/empty-favorites";
import EmptyBoard from "./empty-state/empty-boards";
import EmptyStates from "./empty-state";

type BoardListProps = {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data: any[] = []; // TODO: fetch data

  if (!data?.length) return <EmptyStates data={data} query={query} />;

  return <div>{JSON.stringify(query)}</div>;
};

export default BoardList;
