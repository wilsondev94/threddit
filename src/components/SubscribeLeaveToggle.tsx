"use client";
import { Button } from "@/components/ui/Button";
import { useSubscribeToSubreddit } from "@/hooks/mutation-services/useSubscribeToSubreddit";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  const { subscribe, isSubLoading } = useSubscribeToSubreddit(
    subredditId,
    subredditName
  );

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave community</Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
