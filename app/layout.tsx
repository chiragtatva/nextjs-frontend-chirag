"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createUploadLink } from "apollo-upload-client";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://localhost:3000/graphql",
    headers: { "x-apollo-operation-name": "fileUpload" },
  }),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
