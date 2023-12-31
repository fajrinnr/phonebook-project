import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ApolloWrapper } from "./ApolloWrapper";
import ContactProvider from "@/context/ContactContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book",
  description: "an Phone Book app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <ContactProvider>
          <body className={inter.className}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </body>
        </ContactProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
