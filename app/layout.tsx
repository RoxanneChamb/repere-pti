import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Repère PTI",
    template: "%s | Repère PTI",
  },
  description:
    "Outil éducatif pour aider les étudiantes en soins infirmiers à structurer des PTI et développer leur raisonnement clinique.",

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-512.png",
  },

  appleWebApp: {
    capable: true,
    title: "Repère PTI",
    statusBarStyle: "default",
  },

  openGraph: {
    title: "Repère PTI",
    description:
      "Outil éducatif pour structurer des PTI et pratiquer le raisonnement clinique en soins infirmiers.",
    url: "https://repere-pti.ca",
    siteName: "Repère PTI",
    locale: "fr_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={nunito.className}>
        {children}

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}