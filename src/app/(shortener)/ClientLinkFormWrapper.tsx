"use client";

import cx from "classnames";
import { LinkFormController } from "#/components/LinkForm/LinkFormController";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { Text } from "#/components/ods";
import Link from "next/link";

export function ClientLinkFormWrapper() {
  const { isEditing, setIsEditing } = useShortenedLinkContext();

  return (
    <section
      className={cx("flex-1 lg:block px-4 md:px-2 lg: px-0", {
        hidden: !isEditing,
      })}
    >
      <Text as="div" className="lg:hidden pb-4 pl-2">
        <Link href="/" onClick={() => setIsEditing(false)}>
          Back to list
        </Link>
      </Text>
      <LinkFormController />
    </section>
  );
}
