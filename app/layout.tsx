import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import { AccountNav } from "@/components/AccountNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NoScriptAlert } from "@/components/NoScriptAlert";

// Google Analytics 4 measurement ID for this app's GA property.
const GA_MEASUREMENT_ID = "G-QEP1YJ7MBL";

export const metadata: Metadata = {
  title: "情報伝達ページ",
  description: "情報伝達ページ - KITeC",
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <NoScriptAlert />
        <Header accountSlot={<AccountNav />} />
        <main>{children}</main>
        <Footer />
      </body>
      {/* Google tag (gtag.js) via @next/third-parties — the official Next.js
          integration. Skipped on PR preview deployments: IS_PR_PREVIEW is
          injected at runtime by the deploy infra and read here server-side, so
          it must NOT be NEXT_PUBLIC_ (those inline at build time). */}
      {GA_MEASUREMENT_ID && process.env.IS_PR_PREVIEW !== "true" && (
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
