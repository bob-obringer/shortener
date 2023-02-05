"use client";

import { Facets, SortSettings } from "#/components/LinkList/Facets";
import { LinkList } from "#/components/LinkList/LinkList";
import { useState } from "react";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { ShortenedLink } from "#/types";

export function LinkListController() {
  const { links } = useShortenedLinkContext();

  // todo: filtering doesn't belong here, this belongs with the view/facets
  // todo: also, there's a bug when pressing backslach in search
  const [searchQuery, search] = useState<string>();
  const [sortSettings, sort] = useState<SortSettings>({
    dir: "desc",
    field: "created_date",
  });

  const filteredLinks: ShortenedLink[] = (links || [])
    .filter(
      ({ uri, name }) =>
        !searchQuery || uri.match(searchQuery) || name?.match(searchQuery)
    )
    .sort((link1, link2) => {
      const { field, dir } = sortSettings;
      const field1 = link1[field];
      const field2 = link2[field];
      const leftVal = dir === "asc" ? 1 : -1;
      const rightVal = leftVal * -1;
      return field1 === field2 ? 0 : field1 > field2 ? leftVal : rightVal;
    });

  return (
    <>
      <Facets sort={sort} search={search} sortSettings={sortSettings} />
      <LinkList filteredLinks={filteredLinks} />
    </>
  );
}
