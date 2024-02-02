import Actions from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { Id } from "@root/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardFooter from "./card-footer";
import Overlay from "./overlay";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { api } from "@root/convex/_generated/api";
import { toast } from "sonner";

type BoardCardProps = {
  id: Id<"boards">;
  title: string;
  imageURL: string;
  authorId: string;
  authorName: string;
  creationTime: number;
  orgId: string;
  isFavorite: boolean;
};

const BoardCard = ({
  id,
  authorId,
  authorName,
  creationTime,
  imageURL,
  title,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const { mutate: addFavorite, isPending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: removeFavorite, isPending: pendingUnfavorite } =
    useApiMutation(api.board.unfavorite);

  const authorLabel = authorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(creationTime, { addSuffix: true });

  const toggleFavorite = () => {
    if (isFavorite)
      removeFavorite({id}).catch(() => toast.error("Failed to unfavorite board"));
    else
      addFavorite({ id, orgId }).catch((err) => {
        console.log(err);
        toast.error("Failed to favorite board");
      });
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg justify-between overflow-hidden flex flex-col">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageURL} alt={title} fill className="object-fit p-3" />
          <Actions sideOffset={2} id={id} title={title} side="bottom">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 z-50 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
          <Overlay />
        </div>

        <CardFooter
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
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
