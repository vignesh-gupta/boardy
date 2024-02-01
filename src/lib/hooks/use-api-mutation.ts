import { useMutation } from "convex/react";
import { useState } from "react";

export const useAPIMutation = (mutationFunction: any) => {
  const [isPending, setIsPending] = useState(false);

  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setIsPending(true);
    return apiMutation(payload)
      .finally(() => setIsPending(false))
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  };

  return { mutate, isPending };
};
