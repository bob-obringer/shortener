// todo: tailwind isn't great for colors, no semantic colors
// why ods
// no accessibility with tailwind
// not opinionated about how you want to style your app
// all theming is done via css variables
// theming is a matter of applying variables to classes

import styles from "./SiteHeader.module.scss";
import { Heading, Button } from "#/components/ods";
import Link from "next/link";
import { ClientActions } from "#/components/layout/ClientActions";

export function SiteHeader() {
  return (
    <div className={styles.header}>
      <div className="container flex justify-between items-center">
        <Heading level={2}>
          <Link href="/">Shortener</Link>
        </Heading>
        <ClientActions />
      </div>
    </div>
  );
}
