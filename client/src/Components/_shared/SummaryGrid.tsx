"use client";

import React, { useEffect, useState } from "react";
import { getAllSummaries } from "@/Data/SummaryData";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Section,
  Strong,
  Text,
} from "@radix-ui/themes";
import CardDialog from "../CardDialog";
import ReactPlayer from "react-player/lazy";

const SummaryGrid: React.FC = () => {
  const [summaries, setSummaries] = useState<any>([]);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  const fetchAllSummaries = () => {
    getAllSummaries()
      .then((res: any) => {
        setSummaries(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllSummaries();
  }, []);

  return (
    <Section className="relative w-[90%] max-w-[1400px] h-screen mx-auto !py-24 !flex flex-col justify-center">
      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />
      <Flex direction={"column"} gap={{ md: "8", initial: "4" }}>
        {/* Heading */}
        <Heading
          as="h2"
          className="md:!text-[3.5vw] !text-3xl header-primary text-center md:py-10"
          weight={"bold"}
        >
          Top Summaries <Strong className="text-secondary">Today.</Strong>
        </Heading>

        {/* Tagline */}
        <Heading
          as="h3"
          align={"center"}
          weight={"regular"}
          className="md:!text-2xl !text-lg text-center"
        >
          Get access to our video library which contains video summaries to
          books, articles, blogs etc. Don’t forget to engage with the{" "}
          <Strong className="text-primary">community</Strong> though{" :)"}
        </Heading>

        {/* Grid */}
        <Grid
          columns={{ md: "3", initial: "1" }}
          gap={{ md: "8", initial: "4" }}
          align={"center"}
          justify={"center"}
          width={"full"}
        >
          {summaries.slice(0, 3).map((item: any, index: number) => (
            <Box
              key={index}
              className="!bg-[var(--gray-3)]  border-[1.5px] border-secondary"
              // style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
            >
              <Box className="video-player !bg-[var(--gray-1)] h-[180px]">
                <ReactPlayer
                  key={"youtube"}
                  // light={true}
                  light={
                    // item?.thumbnail ||
                    "/Logo.png"
                  }
                  url={
                    item?.video ||
                    "https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                  }
                  width="100%"
                  height="100%"
                  controls={true}
                  zoom={1}
                />
              </Box>

              <Flex
                direction="column"
                justify="between"
                // className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 w-full"
                className="w-full p-4 pt-0 !bg-[var(--gray-3)] !cursor-pointer"
                onClick={() => {
                  setActiveCard(index);
                  setActiveCardPopup(true);
                }}
              >
                <Flex
                  direction={"column"}
                  justify={"between"}
                  className="!bg-[var(--gray-3)] mt-2"
                >
                  <Text className="text-secondary text-lg !bg-[var(--gray-3)]">
                    {item.name}
                  </Text>
                  <Text className="text-white text-lg !bg-[var(--gray-3)]">
                    {item.summary.substring(0, 50)}...
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>

        {/* Button */}
        <Button
          size={{ md: "4", initial: "2" }}
          className="!bg-secondary !font-bold !w-fit !self-center !px-10"
        >{`Explore ->`}</Button>
      </Flex>
    </Section>
  );
};

export default SummaryGrid;
