import { Id } from "@convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import CardFooter from "./card-footer";
import { Skeleton } from "@/components/ui/skeleton";

type BoardCardProps = {
  id: Id<"boards">;
  title: string;
  imageURL: string;
  authorId: string;
  authorName: string;
  creationTime: number;
  isFavorite: boolean;
};

const BoardCard = ({
  id,
  authorId,
  authorName,
  creationTime,
  imageURL,
  title,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = authorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(creationTime, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg justify-between overflow-hidden flex flex-col">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageURL} alt={title} fill className="object-fit p-3" />
          <Overlay />
        </div>

        <CardFooter
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
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
