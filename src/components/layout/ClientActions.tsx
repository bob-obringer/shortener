"use client";

import { Button } from "#/components/ods";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { TrashIcon, ReloadIcon, DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function ClientActions() {
  const { download, resetAllLinks } = useShortenedLinkContext();
  const { setIsEditing } = useShortenedLinkContext(); // todo, this only needs to be creating

  return (
    <div className="flex gap-2 items-center justify-end">
      <Button
        onPress={resetAllLinks}
        intent="destroy"
        displayType="outline"
        aria-label="Reset"
      >
        <ReloadIcon />
      </Button>
      <Button
        onPress={download}
        intent="secondary"
        displayType="outline"
        aria-label="Download"
      >
        <DownloadIcon />
      </Button>

      <Button asChild>
        <Link href="/" onClick={() => setIsEditing(true)}>
          Create New Link
        </Link>
      </Button>
    </div>
  );
}
