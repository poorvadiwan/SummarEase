import React from "react";
import { Flex } from "@radix-ui/themes";
import SummaryGrid from "../Components/SummaryGrid";

const Home: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      // justify={"between"}
      className="mx-auto"
    >
      {/* <UploadPdf /> */}
      <SummaryGrid />
      {/* <SummaryCarousel /> */}
    </Flex>
  );
};

export default Home;
