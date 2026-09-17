import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";

export const metadata: Metadata = {
  title: "221B — Holmes Personal Intelligence System",
  description: "Personal scheduling and investigation system for Sherlock Holmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <Header />

            <main className="flex-1 overflow-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}