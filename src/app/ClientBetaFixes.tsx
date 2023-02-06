"use client";

import { useEffect } from "react";

export default function ClientBetaFixes() {
  /*
    NextJS app folder is adding a it's own viewport tag
    Drop this in wherever we need to remove it to ensure ours is applied
   */
  useEffect(() => {
    const meta = document.head.getElementsByTagName("meta");
    const vpTags = Array.from(meta).filter((tag) => tag.name === "viewport");
    if (vpTags.length > 1) {
      const tagToRemove = vpTags.pop();
      document.head.removeChild(tagToRemove!);
    }
  }, []);
  return null;
}
