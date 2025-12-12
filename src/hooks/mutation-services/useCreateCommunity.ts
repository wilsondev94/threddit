"use client";

import { CreateSubredditValidation } from "@/lib/validators/subredit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCommunity = (input: string) => {
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditValidation = {
        name: input,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast(
            "Subreddit already exists. Please choose a different name."
          );
        }

        if (err.response?.status === 422) {
          return toast.error(
            "Invalid subreddit name. Please choose a name between 3 and 21 letters"
          );
        }

        if (err.response?.status === 401) {
          return toast.error(
            "You're unauthorized! Please login to create a community"
          );
        }
      }

      toast.error("Could not create subreddit.");
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  return {
    createCommunity,
    isLoading,
  };
};
