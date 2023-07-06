"use client";

import { Icon } from "./iconify-icon";

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
