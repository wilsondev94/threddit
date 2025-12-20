"use client";

import { CommentValidation } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseCreateCommentProps {
  setInput: (_value: string) => void;
}

export function useCreateComment({ setInput }: UseCreateCommentProps) {
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentValidation) => {
      const payload: CommentValidation = { postId, text, replyToId };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment/`,
        payload
      );
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error("");
        }
      }

      return toast.error(
        "Comment wasn't created successfully. Please try again."
      );
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });

  return {
    comment,
    isLoading,
  };
}
