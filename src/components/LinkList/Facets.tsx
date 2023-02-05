"use client";

import { TextField, Text, FocusRing } from "#/components/ods";
import styles from "./Facets.module.scss";
import { ChangeEvent } from "react";

const UP_ARROW = <>&#9650;</>;
const DOWN_ARROW = <>&#9660;</>;
const DOWN_ARROW_EMPTY = <>&#9661;</>;

export interface SortSettings {
  dir: "asc" | "desc";
  field: "count" | "created_date";
}

export function Facets({
  search,
  sort,
  sortSettings,
}: {
  search: (query: string) => void;
  sort: (sortSettings: SortSettings) => void;
  sortSettings: SortSettings;
}) {
  const isDateSort = sortSettings.field === "created_date";
  const isAsc = sortSettings.dir === "asc";

  function handleSort(field: typeof sortSettings.field) {
    if (field !== sortSettings.field) {
      sort({ field, dir: "desc" });
    } else {
      sort({
        ...sortSettings,
        dir: sortSettings.dir === "asc" ? "desc" : "asc",
      });
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    search(event.target.value);
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Text
          as="div"
          role="button"
          aria-label="Sort By Date"
          onClick={() => handleSort("created_date")}
          className={styles.sortFacetItem}
          size="xs"
          weight={isDateSort ? "heavy" : "default"}
          color={isDateSort ? "bright" : "subtle"}
        >
          Date {!isDateSort ? DOWN_ARROW_EMPTY : isAsc ? UP_ARROW : DOWN_ARROW}
        </Text>

        <Text
          onClick={() => handleSort("count")}
          role="button"
          aria-label="Sort By Count"
          className={styles.sortFacetItem}
          size="xs"
          weight={isDateSort ? "default" : "heavy"}
          color={isDateSort ? "subtle" : "bright"}
        >
          Count {isDateSort ? DOWN_ARROW_EMPTY : isAsc ? UP_ARROW : DOWN_ARROW}
        </Text>
      </div>
      <TextField
        aria-label="Search"
        onChange={handleSearchChange}
        size="s"
        placeholder="Search"
        onBeforeInput={(e) => {
          // @ts-ignore -- todo: types on textfield are wrong, fix this
          if (!/[a-zA-Z0-9\s]+/.test(e.data)) e.preventDefault();
        }}
        // pattern="[a-zA-Z0-9\s]+"
      />
    </div>
  );
}
