"use client";

import { SubscribeToSubredditValidation } from "@/lib/validators/subredit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export function useUnsubscribeFromSubreddit(
  subredditId: string,
  subredditName: string
) {
  const router = useRouter();

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditValidation = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data as string);
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast.success(`You are now unsubscribed from/${subredditName}`);
    },
  });

  return {
    unsubscribe,
    isUnsubLoading,
  };
}
