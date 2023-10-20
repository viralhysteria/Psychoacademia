import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: "Next.js",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
  title: "Psychoacademia",
  description: "Curated compendium of psychonaut-oriented literature",
  creator: "viralhysteria",
  keywords: ["psychonaut", "academia", "literature", "psychedelics"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
