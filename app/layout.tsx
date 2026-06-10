import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NoScriptAlert } from "@/components/NoScriptAlert";

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
      <head>
        {/* Google tag (gtag.js) — skipped on PR preview deployments.
            IS_PR_PREVIEW is injected at runtime by the deploy infra and read
            here server-side, so it must NOT be NEXT_PUBLIC_ (those inline at
            build time). */}
        {process.env.IS_PR_PREVIEW !== "true" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-QEP1YJ7MBL"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QEP1YJ7MBL');
  `}
            </Script>
          </>
        )}
      </head>
      <body>
        <NoScriptAlert />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
