import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/layout/AppShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SpineBridge",
  description:
    "Simulator educațional în limba română pentru recuperare funcțională și dialog clinic."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5ef"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
