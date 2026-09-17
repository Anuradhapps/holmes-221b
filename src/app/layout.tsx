import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";

export const metadata: Metadata = {
  title: "221B — Holmes Personal Intelligence System",
  description:
    "Personal scheduling and investigation system for Sherlock Holmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <div className="flex h-screen overflow-hidden">
          {/* Desktop sidebar */}
          <div className="hidden md:block md:shrink-0">
            <Sidebar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}