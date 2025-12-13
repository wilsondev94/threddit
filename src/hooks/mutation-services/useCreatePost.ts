"use client";

import { PostCreationValidation } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreatePost() {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: PostCreationValidation) => {
      const payload: PostCreationValidation = { title, content, subredditId };
      const { data } = await axios.post("/api/subreddit/post/create", payload);
      return data;
    },
    onError: () => {
      return toast.error("Your post was not published. Please try again.");
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);

      router.refresh();

      return toast.success("Your post has been published.");
    },
  });

  return { createPost };
}
