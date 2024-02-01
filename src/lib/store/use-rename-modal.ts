import { create } from "zustand";

const defaultValue = { id: "", title: "" };

type IRenameModel = {
  isOpen: boolean;
  initialValues: typeof defaultValue;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
};

export const useRenameModal = create<IRenameModel>((set) => ({
  isOpen: false,
  initialValues: defaultValue,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () => set({ isOpen: false, initialValues: defaultValue }),
}));
