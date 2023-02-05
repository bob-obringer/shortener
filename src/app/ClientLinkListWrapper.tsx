"use client";

import cx from "classnames";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { LinkListController } from "#/components/LinkList/LinkListController";

export function ClientLinkListWrapper() {
  const { isEditing } = useShortenedLinkContext();

  return (
    <section
      className={cx("flex flex-col flex-1 overflow-hidden lg:flex h-full", {
        hidden: isEditing,
      })}
    >
      <LinkListController />
    </section>
  );
}
