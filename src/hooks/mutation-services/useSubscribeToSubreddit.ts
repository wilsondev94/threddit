"use client";

import { SubscribeToSubredditValidation } from "@/lib/validators/subredit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export const useSubscribeToSubreddit = (
  subredditId: string,
  subredditName: string
) => {
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditValidation = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error(
            "You must be logged in to subscribe to a subreddit."
          );
        }
      }

      return toast.error("Something went wrong. Please try again.");
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast.success(`You are now subscribed to r/${subredditName}`);
    },
  });

  return {
    subscribe,
    isSubLoading,
  };
};
