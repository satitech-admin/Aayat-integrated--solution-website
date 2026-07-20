import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionShell } from "@/components/MotionShell";
import { StructuredData } from "@/components/StructuredData";
import { company } from "@/lib/siteData";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayat-integrated-solutions.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AAYAT Integrated Solutions | ISPM-15 Pallets and Export Packaging",
    template: "%s | AAYAT Integrated Solutions",
  },
  description:
    "AAYAT Integrated Solutions manufactures ISPM-15 certified wooden pallets and provides export packaging, waste management, warehouse racking, leasing, land, and factory setup support across India.",
  applicationName: company.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AAYAT Integrated Solutions",
    description:
      "Manufacturer and supplier of ISPM-15 certified wooden pallets, export packaging, warehouse infrastructure, waste management, and industrial support.",
    url: siteUrl,
    siteName: company.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AAYAT Integrated Solutions industrial website preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAYAT Integrated Solutions",
    description:
      "ISPM-15 certified wooden pallets, export packaging, waste management, and industrial support from AAYAT.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06100C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <StructuredData />
        <MotionShell>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionShell>
      </body>
    </html>
  );
}
