import { SiteHeader } from "#/components/layout/SiteHeader";
import { ReactNode } from "react";

import { ClientLinkFormWrapper } from "#/app/(shortener)/ClientLinkFormWrapper";
import { ClientLinkListWrapper } from "#/app/(shortener)/ClientLinkListWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="container py-5 flex gap-8 flex-1 overflow-hidden">
        <ClientLinkListWrapper />
        <ClientLinkFormWrapper />
      </main>
    </>
  );
}
