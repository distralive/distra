"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";

export function FollowButton({
  userId,
  session,
}: {
  userId: string;
  session: Session | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Function to fetch follow status
    const fetchFollowStatus = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/user/follow/${userId}`, {
          method: "GET",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        // Set the follow status based on the response
        setIsFollowing(data.isFollowing);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch follow status
    fetchFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Update the follow status after successfully following/unfollowing
      setIsFollowing(data.isFollowing);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (session?.user?.id === userId) {
    return <Button disabled>Follow</Button>;
  } else {
    return (
      <Button onClick={handleFollow} disabled={isLoading}>
        {isLoading ? "Processing..." : isFollowing ? "Followed" : "Follow"}
      </Button>
    );
  }
}
