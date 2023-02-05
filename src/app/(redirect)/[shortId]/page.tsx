"use client";

import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { useEffect, useRef } from "react";

export default function ShortIdPage({
  params,
}: {
  params: { shortId: string };
}) {
  const { shortId } = params;
  const { links, incrementAndRedirect } = useShortenedLinkContext();

  const activeLink = links?.find(
    ({ raw_shortened_path_id }) => raw_shortened_path_id === shortId
  );

  // quirky, prevent rerenders from looping
  const isRedirecting = useRef(false);
  useEffect(() => {
    // links load from local storage on page load, don't do anything until they're loaded
    if (!activeLink || isRedirecting.current) {
      return;
    }
    isRedirecting.current = true;
    incrementAndRedirect(activeLink.id);
  }, [activeLink, incrementAndRedirect]);

  return null;
}
