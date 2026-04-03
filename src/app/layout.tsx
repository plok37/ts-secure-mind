import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Secure Mind",
  description: "Decentralized Application for Smart Contract Security Education",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header/>
          {props.children}
        </Providers>
      </body>
    </html>
  );
}