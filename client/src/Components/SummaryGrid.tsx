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
import CardDialog from "./CardDialog";
import { HeartIcon, ReaderIcon } from "@radix-ui/react-icons";
import YouTubePlayer from "react-player/youtube";
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
    <Section className="w-[90%] max-w-[1200px] h-[85vh] mx-auto !py-16 !flex flex-col justify-center">
      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />
      <Flex direction={"column"} gap={"8"}>
        {/* Heading */}
        <Heading
          as="h2"
          className="!text-[4vw] header-primary text-center py-10"
          weight={"bold"}
        >
          Top Summaries <Strong className="text-secondary">Today.</Strong>
        </Heading>

        {/* Tagline */}
        <Heading
          as="h3"
          align={"center"}
          weight={"regular"}
          className="!text-2xl text-center"
        >
          Get access to our video library which contains video summaries to
          books, articles, blogs etc. Don’t forget to engage with the{" "}
          <Strong className="text-primary">community</Strong> though{":)"}
        </Heading>

        {/* Grid */}
        <Grid
          columns={{ md: "3", initial: "1" }}
          gap={"6"}
          align={"center"}
          justify={"center"}
          width={"full"}
        >
          {summaries.slice(0, 3).map((item: any, index: number) => (
            <Box
              key={index}
              className="!bg-[var(--gray-3)] p-4 rounded-md border-[1.5px] border-secondary"
              // style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
            >
              {/* <video
                id={`video-${index}`}
                className="video-element absolute inset-0 w-full h-full"
                muted
                autoPlay={false}
                loop
                playsInline
              >
                <source
                  src={
                    //   item?.video ||
                    "https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                  }
                  type="video/mp4"
                />
              </video> */}
              <Box className="video-player !bg-[var(--gray-3)] h-[180px]">
                <ReactPlayer
                  key={"vimeo"}
                  light={true}
                  url={
                    // item?.video ||
                    "https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                  }
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </Box>
              {/* <ReactPlayer
                key={"vimeo"}
                url={
                  // item?.video ||
                  "https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                }
                width="100%"
                height="100%"
                controls={true}
              /> */}
              <Flex
                direction="column"
                justify="between"
                // className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 w-full"
                className="w-full !bg-[var(--gray-3)]"
              >
                {/* <Flex p="4" justify="end">
                  <IconButton
                    variant="soft"
                    className="text-white !cursor-pointer"
                    aria-label="Like"
                    size={"3"}
                  >
                    <HeartIcon color="white" width="25" height="25" />
                  </IconButton>
                </Flex> */}
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
                  {/* <Flex justify="between">
                    <Button
                      variant="solid"
                      size={"3"}
                      style={{ borderRadius: "20px" }}
                      className="text-white !text-lg !cursor-pointer"
                      aria-label="View More Details"
                      onClick={() => {
                        setActiveCard(index);
                        setActiveCardPopup(true);
                      }}
                    >
                      <ReaderIcon width={"20"} height={"20"} />
                      View Details
                    </Button>
                  </Flex> */}
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
