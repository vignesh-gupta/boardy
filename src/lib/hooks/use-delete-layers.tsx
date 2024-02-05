import { useMutation, useSelf } from "@root/liveblocks.config";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ setMyPresence, storage }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      for (const id of selection) {
        liveLayers.delete(id);
        liveLayerIds.delete(liveLayerIds.indexOf(id));
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};
