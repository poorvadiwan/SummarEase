import React from "react";
import UploadPdf from "../Components/UploadPdf";
import SummaryCarousel from "../Components/SummaryCarousel";
import { Container } from "@radix-ui/themes";

const Home: React.FC = () => {
  return (
    <Container>
      <UploadPdf />
      <SummaryCarousel />
    </Container>
  );
};

export default Home;
