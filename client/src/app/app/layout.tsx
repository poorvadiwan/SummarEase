import { Fira_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.min.css";
import "@radix-ui/themes/styles.css";
import Navbar from "@/Components/App/_appShared/Navbar";

const fira = Fira_Sans({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${fira.className} bg-background min-h-screen`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
