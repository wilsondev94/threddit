"use client";
import { Button } from "@/components/ui/Button";
import { useSubscribeToSubreddit } from "@/hooks/mutation-services/useSubscribeToSubreddit";
import { useUnsubscribeFromSubreddit } from "@/hooks/mutation-services/useUnsubscribeFromSubreddit";

interface SubscribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
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
  const { unsubscribe, isUnsubLoading } = useUnsubscribeFromSubreddit(
    subredditId,
    subredditName
  );

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
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
