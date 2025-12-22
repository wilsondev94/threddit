"use client";

import { CommentValidation } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function usePostComment(setIsReplying: (_value: boolean) => void) {
  const router = useRouter();
  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentValidation) => {
      const payload: CommentValidation = { postId, text, replyToId };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload
      );
      return data;
    },

    onError: () => {
      return toast.error(
        "Comment wasn't posted successfully. Please try again."
      );
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });

  return {
    postComment,
    isLoading,
  };
}
