import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { useRenameModal } from "@/lib/store/use-rename-modal";
import { cn } from "@/lib/utils";
import { api } from "@root/convex/_generated/api";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type NewBoardButtonProps = {
  orgId: string;
  disabled?: boolean;
};

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: createBoard, isPending } = useApiMutation(api.board.create);
  const { onOpen } = useRenameModal();

  const handleCreateBoard = () => {
    createBoard({ orgId, title: "Untitled" })
      .then((id) => {
        toast.success("Board created successfully");
        onOpen(id, "Untitled");
        // router.push(`/board/${id}`);
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
      <Plus className="w-12 h-12 text-white stroke-1" />
      <p className="text-sm font-light text-white">New Board</p>
    </button>
  );
};

export default NewBoardButton;
