"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmptyBoard = () => {
  const { mutate: createBoard, isPending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();
  const router = useRouter();

  const handleCreateBoard = async () => {
    if (!organization) return;

    createBoard({
      orgId: organization?.id,
      title: "New Board",
    })
      .then((id) => {
        toast.success("Board created successfully");
        router.push(`/board/${id}`);
      })
      .catch((err) => {
        console.error("[EmptyBoard_ERR]", err);
        toast.error("Failed to create!");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="Empty board" />
      <h2 className="text-2xl mt-6 font-semibold ">Create your first board</h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Start by creating a board for your team
      </p>
      <div className="mt-6">
        <Button disabled={isPending} size="lg" onClick={handleCreateBoard}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
