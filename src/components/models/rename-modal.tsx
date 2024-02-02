"use client";

import { useRenameModal } from "@/lib/store/use-rename-modal";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { api } from "@root/convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {
  const { mutate: updateBoard, isPending } = useApiMutation(api.board.update);

  const { initialValues, isOpen, onClose } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    updateBoard({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={false}
            required
            maxLength={60}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
            value={title}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={false} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
