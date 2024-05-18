import Hero from "@/Components/Hero/Hero";
import SummaryGrid from "@/Components/SummaryGrid";
import Page from "@/Components/_shared/Page";
import { Box, Button, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Page className="!py-0">
      {/* Hero Section */}
      <Hero />

      {/* Latest Summaries */}
      <SummaryGrid />
    </Page>
  );
}
