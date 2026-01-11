import type { Metadata } from "next";
import {
  Darker_Grotesque,
  Krona_One,
  Poppins,
  Rubik,
  Rubik_Scribble,
} from "next/font/google";
import "../styles/globals.css";
import { ClientLayout } from "./clientlayout";

const FontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const FontKronaOne = Krona_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-krona-one",
});

const FontDarkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-darker-grotesque",
});

const FontRubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

const FontRubikScribble = Rubik_Scribble({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rubik-scribble",
});

export const metadata: Metadata = {
  title: "HighPixel",
  description:
    "High Pixel é um projeto de alto nível desenvolvido para a plataforma SAMP, oferecendo aspectos únicos que o diferenciam de outros servidores do mesmo segmento. Somos todos gamers, então entendemos as necessidades e como atendê-las. Trazemos a experiência, a dedicação e a paixão para tornar o HighPixel uma experiência única.",
  keywords: ["samp", "servidor"],
  authors: [{ name: "HighPixel" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://highpixelgg.com",
    title: "HighPixel",
    description:
      "High Pixel é um projeto de alto nível desenvolvido para a plataforma SAMP, oferecendo aspectos únicos que o diferenciam de outros servidores do mesmo segmento. Somos todos gamers, então entendemos as necessidades e como atendê-las. Trazemos a experiência, a dedicação e a paixão para tornar o HighPixel uma experiência única.",
    siteName: "HighPixel",
    images: [
      {
        url: "/highpixel_two.png",
        width: 1200,
        height: 630,
        alt: "HighPixel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HighPixel",
    description:
      "High Pixel é um projeto de alto nível desenvolvido para a plataforma SAMP, oferecendo aspectos únicos que o diferenciam de outros servidores do mesmo segmento. Somos todos gamers, então entendemos as necessidades e como atendê-las. Trazemos a experiência, a dedicação e a paixão para tornar o HighPixel uma experiência única.",
    images: ["/highpixel_three.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`dark ${FontPoppins.variable} ${FontKronaOne.variable} ${FontDarkerGrotesque.variable} ${FontRubikScribble.variable} ${FontRubik.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="mx-auto antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
