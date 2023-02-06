import { SiteHeader } from "#/components/layout/SiteHeader";
import { ReactNode } from "react";

import { ClientLinkFormWrapper } from "#/app/(shortener)/ClientLinkFormWrapper";
import { ClientLinkListWrapper } from "#/app/(shortener)/ClientLinkListWrapper";
import styles from "./ShortenerLayout.module.scss";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="container flex gap-8 flex-1 overflow-hidden pt-5 pb-0 px-0 md:px-2 lg:px-4">
        <ClientLinkListWrapper />
        <ClientLinkFormWrapper />
      </main>
    </>
  );
}
