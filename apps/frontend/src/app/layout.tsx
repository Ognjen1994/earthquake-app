import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "./providers/apollo-provider";

export const metadata: Metadata = {
  title: "Earthquake Dashboard",
  description: "Earthquake monitoring application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
