// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLACK URBAN",
  description: "Records • Foundation • Media • Empire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
