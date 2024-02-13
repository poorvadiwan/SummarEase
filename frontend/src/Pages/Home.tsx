import React from "react";
import UploadPdf from "../Components/UploadPdf";
import SummaryCarousel from "../Components/SummaryCarousel";
import { Flex } from "@radix-ui/themes";

const Home: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      justify={"between"}
      className="w-5/6 mx-auto h-[90vh]"
    >
      <UploadPdf />
      <SummaryCarousel />
    </Flex>
  );
};

export default Home;
