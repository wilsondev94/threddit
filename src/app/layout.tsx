import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Threddit",
  description: "A mock of the Reddit application.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
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
        {/* @ts-expect-error server component */}
        <Navbar />
        {authModal}
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!rounded-md !p-4 !shadow-lg !w-fit !max-w-[90vw]",
              title: "text-sm font-medium",
              description: "text-xs opacity-90",
              success: "!text-white !bg-green-500",
              error: "!text-white !bg-red-500",
            },
          }}
        />
      </body>
    </html>
  );
}
