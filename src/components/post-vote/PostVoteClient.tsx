"use client";

import { cn } from "@/lib/utils";
import { VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { PostVoteValidation } from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";
import { usePrevious } from "@mantine/hooks";
import { toast } from "sonner";

interface PostVoteClientProps {
  postId: string;
  initialVotesCount: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVotesCount,
  initialVote,
}: PostVoteClientProps) => {
  const [votesCount, setVotesCount] = useState<number>(initialVotesCount);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteValidation = {
        voteType: type,
        postId: postId,
      };

      await axios.patch("/api/subreddit/post/vote", payload);
    },
    onError: (err, voteType) => {
      // revert votes count in case of error
      if (voteType === "UP") setVotesCount((prev) => prev - 1);
      else setVotesCount((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error("You must be logged in to vote.");
        }
      }

      return toast.error("Your vote was not registered. Please try again.");
    },
    // optimistic update
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesCount((prev) => prev - 1);
        else if (type === "DOWN") setVotesCount((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP")
          setVotesCount((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesCount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      {/* upvote */}
      <Button
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>

      {/* score */}
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesCount}
      </p>

      {/* downvote */}
      <Button
        onClick={() => vote("DOWN")}
        size="sm"
        className={cn({
          "text-emerald-500": currentVote === "DOWN",
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
