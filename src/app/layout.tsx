import { CSSProperties, ReactNode } from "react";
import { Montserrat } from "@next/font/google";
import cx from "classnames";

import "#/styles/reset.css";
import "./global.css";
import "@bob-obringer/ods/dist/ods-components.css";
import "@bob-obringer/ods/dist/ods-theme.css";
import "@bob-obringer/ods/dist/ods-dark-mode.css";
import "@bob-obringer/ods/dist/ods-light-mode.css";
import "#/styles/theme.css";
import { ShortenedLinkContextProvider } from "#/app/ShortenedLinkContext";

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
      <body className="flex flex-col">
        <ShortenedLinkContextProvider>{children}</ShortenedLinkContextProvider>
      </body>
    </html>
  );
}
