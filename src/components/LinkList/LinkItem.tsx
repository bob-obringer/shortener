import { ShortenedLink } from "#/types";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { useSelectedLayoutSegments } from "next/navigation";
import { FocusRing, Text } from "#/components/ods";
import Link from "next/link";
import cx from "classnames";
import styles from "#/components/LinkList/LinkList.module.scss";

export function LinkItem({ link }: { link: ShortenedLink }) {
  const { setIsEditing } = useShortenedLinkContext();
  const segs = useSelectedLayoutSegments();
  const isActive = segs[1] === link.raw_shortened_path_id;

  return (
    <li
      data-testid={`link-${link.raw_shortened_path_id}`}
      aria-current={isActive}
    >
      <FocusRing>
        <Link
          className="block"
          href={`/link/${link.raw_shortened_path_id}`}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <div
            className={cx(styles.linkItem, "flex flex-col gap-1", {
              [styles.active]: isActive,
            })}
          >
            <div className="flex justify-between items-center w-full">
              <Text as="div" size="xs" className="flex-1">
                {link.raw_shortened_path_id} • {link.created_date}
              </Text>
              <Text className={styles.count} as="div" size="xs">
                {link.count}
              </Text>
            </div>
            <Text color="bright">
              {link.name
                ? link.name
                : `${link.root}${link.path}${
                    link.uri.match(/\?/) ? "?..." : ""
                  }`}
            </Text>
          </div>
        </Link>
      </FocusRing>
    </li>
  );
}
