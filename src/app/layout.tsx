import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Mulish, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LicenSquare | Medical Licensing Experts",
  description:
    "LicenSquare helps physicians and clinicians get licensed in any U.S. state with end-to-end support and expert guidance.",
  icons: {
    icon: "/branding/logo.png",
    apple: "/branding/logo.png",
  },
  openGraph: {
    title: "LicenSquare | Your License. Our Expertise.",
    description:
      "Streamlined medical licensing support for doctors across every U.S. state.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        mulish.variable,
        jakarta.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-sm text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
