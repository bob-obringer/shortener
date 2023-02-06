import { CSSProperties, ReactNode } from "react";
import { Montserrat } from "@next/font/google";
import cx from "classnames";

import "#/styles/reset.css";
import "./global.css";
import "ods-base/dist/ods-components.css";
import "ods-base/dist/ods-theme.css";
import "ods-base/dist/ods-dark-mode.css";
import "ods-base/dist/ods-light-mode.css";
import "#/styles/theme.css";
import { ShortenedLinkContextProvider } from "#/app/ShortenedLinkContext";
import ClientBetaFixes from "#/app/ClientBetaFixes";

const sansSerifFont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        sansSerifFont.className,
        "ods-theme",
        "ods-dark-mode",
        "site-theme"
      )}
      style={
        {
          "--ods-font-family-sans-serif": sansSerifFont.style.fontFamily,
        } as CSSProperties
      }
    >
      <ClientBetaFixes />
      <body className="flex flex-col">
        <ShortenedLinkContextProvider>{children}</ShortenedLinkContextProvider>
      </body>
    </html>
  );
}
