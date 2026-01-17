import { Noto_Sans_JP } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const noto = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  generator: "Next.js",
  title: "Psychoacademia",
  description: "Curated compendium of psychonaut-oriented literature",
  creator: "viralhysteria",
  keywords: ["psychonaut", "academia", "literature", "psychedelics"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = 'light';
                  localStorage.setItem('theme', theme);
                }
                document.documentElement.setAttribute('data-bs-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className={noto.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
