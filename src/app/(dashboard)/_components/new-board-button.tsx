import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NewBoardButtonProps = {
  orgId: Id<"boards">;
  disabled?: boolean;
};

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: createBoard, isPending } = useApiMutation(api.board.create);

  const router = useRouter();

  const handleCreateBoard = () => {
    createBoard({ orgId, title: "New Board from plus" })
      .then((id) => {
        toast.success("Board created successfully");
        router.push(`/board/${id}`);
      })
      .catch((err) => {
        console.error("[NEW_BOARD_BUTTON_ERROR]", err);
        toast.error("Board creation failed");
      });
  };

  return (
    <button
      disabled={isPending || disabled}
      onClick={handleCreateBoard}
      className={cn(
        "col-span-1 aspect-[100/127] rounded-lg bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (isPending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
