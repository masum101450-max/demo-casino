import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Demo Casino",
  description: "Legal demo casino experience with virtual credits"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
