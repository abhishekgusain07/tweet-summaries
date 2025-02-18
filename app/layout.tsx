import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://tweetdigest.vercel.app/"),
  title: {
    default: 'TweetDigest',
    template: `%s | TweetDigest`
  },
  description:
    "Connect with your favorite creators from X and get daily summaries of their tweets",
  openGraph: {
    description:
      "Connect with your favorite creators from X and get daily summaries of their tweets",
    images: [
      "https://li9sqc5e6d.ufs.sh/f/PU27fyKZHOv1BDsJI1zuLAlPMqZ6go31OeYjtp5z7xFNXUKr", // You should update this with your actual OG image URL
    ],
    url: "https://tweetdigest.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TweetDigest",
    description:
      "Connect with your favorite creators from X and get daily summaries of their tweets",
    creator: "@AGusainBuilds",
    creatorId: "",
    images: [
      "https://li9sqc5e6d.ufs.sh/f/PU27fyKZHOv1BDsJI1zuLAlPMqZ6go31OeYjtp5z7xFNXUKr", 
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
