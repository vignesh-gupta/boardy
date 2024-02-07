"use client";

import { Link2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import ConfirmModal from "@/components/models/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { useRenameModal } from "@/lib/store/use-rename-modal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { api } from "@root/convex/_generated/api";

type ActionsProps = {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
};

const Actions = ({ children, id, title, side, sideOffset }: ActionsProps) => {
  const { mutate: deleteBoard, isPending } = useApiMutation(api.board.remove);

  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Copied link"))
      .catch(() => toast.error("Failed to copy"));
  };

  const onDelete = () => {
    deleteBoard({ id })
      .then(() => toast.success("Deleted board"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete this board and all of its content"
          disabled={isPending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer w-full text-sm justify-start font-normal"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
