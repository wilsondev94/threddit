"use client";

import { cn } from "@/lib/utils";
import { VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

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

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  return (
    <div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      {/* upvote */}
      <Button size="sm" variant="ghost" aria-label="upvote">
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
