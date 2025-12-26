"use client";

import { Icon } from "@/components/shared/components/iconify-icon";

export function DeleteVideoButton({ video }: { video: any }) {
  function handleClick() {
    fetch(`/api/video/${video.id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return (
    <button onClick={handleClick}>
      <Icon icon="heroicons:trash" />
    </button>
  );
}
