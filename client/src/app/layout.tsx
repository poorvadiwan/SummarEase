import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "@/Components/_shared/Navbar";
// import Navbar from "@/Components/NavbarOld";

const fira = Fira_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "SummarEase",
  description: "Get your video summaries...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <ToastContainer />
        <Theme
          appearance="dark"
          accentColor="sky"
          grayColor="sand"
          radius="large"
          scaling="95%"
        >
          <Navbar />

          <main>{children}</main>
          {/* Footer */}
        </Theme>
      </body>
    </html>
  );
}
