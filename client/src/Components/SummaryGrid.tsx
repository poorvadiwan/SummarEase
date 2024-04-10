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
  Text,
} from "@radix-ui/themes";
import CardDialog from "./CardDialog";
import { HeartIcon, ReaderIcon } from "@radix-ui/react-icons";

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
    <Section className="w-5/6 max-w-[1200px] mx-auto !py-8">
      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />
      <Heading
        className="header-primary text-center pb-10"
        weight={"regular"}
        size={"8"}
      >
        Recent Summaries
      </Heading>
      <Grid columns={"2"} gap={"4"} align={"center"} justify={"center"}>
        {summaries.map((item: any, index: number) => (
          <Box
            key={index}
            className="relative"
            style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
          >
            <video
              id={`video-${index}`}
              className="bg-cover video-element absolute inset-0 w-full h-full"
              muted
              autoPlay={false}
              loop
              playsInline
            >
              <source
                src={
                  item?.video ||
                  "https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                }
                type="video/mp4"
              />
            </video>
            <Flex
              direction="column"
              justify="between"
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 w-full"
            >
              <Flex p="4" justify="end">
                <IconButton
                  variant="soft"
                  className="text-white !cursor-pointer"
                  aria-label="Like"
                  size={"3"}
                >
                  <HeartIcon color="white" width="25" height="25" />
                </IconButton>
              </Flex>
              <Flex
                direction={"row"}
                justify={"between"}
                align={"center"}
                px={"4"}
                py={"5"}
              >
                <Text className="text-white text-xl">{item.name}</Text>
                <Flex justify="between">
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
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Section>
  );
};

export default SummaryGrid;
