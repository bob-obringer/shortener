import { ShortenedLink } from "#/types";
import { LinkItem } from "#/components/LinkList/LinkItem";

export function LinkList({
  filteredLinks,
}: {
  filteredLinks: ShortenedLink[];
}) {
  return (
    <ul
      aria-label="Link List"
      className="flex gap-2 flex-col overflow-scroll flex-1"
    >
      {filteredLinks?.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </ul>
  );
}
