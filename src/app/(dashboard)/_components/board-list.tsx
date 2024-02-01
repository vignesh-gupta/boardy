"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import EmptyStates from "./empty-state";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
import { Id } from "@convex/_generated/dataModel";

type BoardListProps = {
  orgId: Id<"boards">;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.getBoards, { orgId });

  if (data === undefined)
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Boards" : "Team Boards"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <BoardCard.Skeleton key={`card-skeleton-${i}`} />
            ))}
        </div>
      </div>
    );

  if (!data?.length) return <EmptyStates data={data} query={query} />;

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageURL={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            creationTime={board._creationTime}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
