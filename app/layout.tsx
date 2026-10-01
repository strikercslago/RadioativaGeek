import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-brush" });
const origin = process.env.SITE_URL;

export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: "/" } } : {}),
  title: {
    default: "Radioativa Geek | Loja Geek em Passo Fundo",
    template: "%s | Radioativa Geek",
  },
  description:
    "Loja geek em Passo Fundo com camisetas, canecas, Funkos, TCG, colecionáveis e presentes criativos para fãs de cultura pop.",
  applicationName: "Radioativa Geek",
  keywords: [
    "loja geek em Passo Fundo",
    "Radioativa Geek",
    "colecionáveis",
    "TCG",
    "presentes criativos",
    "cultura pop",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Radioativa Geek | Loja geek em Passo Fundo",
    description:
      "Camisetas, canecas, Funkos, TCG, colecionáveis e presentes criativos para fãs de cultura pop.",
    locale: "pt_BR",
    siteName: "Radioativa Geek",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Radioativa Geek — cultura pop em Passo Fundo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.jpg"],
    title: "Radioativa Geek | Loja geek em Passo Fundo",
    description:
      "A loja geek de Passo Fundo para quem vive a cultura pop.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${bebasNeue.variable} ${marker.variable}`}>{children}</body>
    </html>
  );
}
