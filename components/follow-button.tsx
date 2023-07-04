"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function FollowButton({ userId }: { userId: string }) {
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

  return (
    <Button onClick={handleFollow} disabled={isLoading}>
      {isLoading ? "Processing..." : isFollowing ? "Followed" : "Follow"}
    </Button>
  );
}
