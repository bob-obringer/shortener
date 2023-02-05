import { SiteHeader } from "#/components/layout/SiteHeader";
import { ReactNode } from "react";

import "#/styles/reset.css";
import "#/app/global.css";
import "@bob-obringer/ods/dist/ods-components.css";
import "@bob-obringer/ods/dist/ods-theme.css";
import "@bob-obringer/ods/dist/ods-dark-mode.css";
import "@bob-obringer/ods/dist/ods-light-mode.css";
import "#/styles/theme.css";
import { ClientLinkFormWrapper } from "#/app/ClientLinkFormWrapper";
import { ClientLinkListWrapper } from "#/app/ClientLinkListWrapper";

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
