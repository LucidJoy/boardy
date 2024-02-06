import React, { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload) => {
    setPending(true);
    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };

  return { mutate, pending };
};
