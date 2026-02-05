import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GlobeMed at UNC-Chapel Hill",
  description: "GlobeMed is a student-led organization that partners with and fundraises for our global partner ASSADE, a Guatemalan grassroots nonprofit organization providing reproductive and oral healthcare.",
  keywords: ["GlobeMed", "UNC", "Chapel Hill", "ASSADE", "Guatemala", "public health", "nonprofit", "student organization"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
