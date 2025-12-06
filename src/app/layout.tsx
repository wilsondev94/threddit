import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Threddit",
  description: "A mock of the Reddit application.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased ">
        {/* <Navbar /> */}
        <div className="container max-w-7xl mx-auto h-full pt-2">
          {children}
        </div>
      </body>
    </html>
  );
}
