import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { connectToMongoDb } from "@/config/mongo-db-connection";
import CustomLayout from "@/custom-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaikh Vehicle Rentals (Dev)",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  await connectToMongoDb();
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <CustomLayout>{children}</CustomLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
