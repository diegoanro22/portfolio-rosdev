// app/layout.tsx
import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "./contexts/AudioContext";


const share_tech = Share_Tech({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech"
});

export const metadata: Metadata = {
  title: "Portafolio",
  description: "Portafolio de Diego Rosales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${share_tech.variable} antialiased`}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
