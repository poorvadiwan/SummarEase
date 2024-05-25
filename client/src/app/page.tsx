import Hero from "@/Components/Hero/Hero";
import SummaryGrid from "@/Components/_shared/SummaryGrid";
import Page from "@/Components/_shared/Page";
import Navbar from "@/Components/_shared/Navbar";

export default function Home() {
  return (
    <Page className="!py-0">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Latest Summaries */}
      <SummaryGrid />
    </Page>
  );
}
