import {
  Box,
  Card,
  Dialog,
  Flex,
  Grid,
  Heading,
  IconButton,
  Section,
  Text,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { getAllTrendies } from "../Data/SummaryData";
import { Cross1Icon } from "@radix-ui/react-icons";
import ReactPlayer from "react-player";
import PDFViewer from "../Components/PdfViewer";

const Trending = () => {
  const [summaries, setSummaries] = useState<any>([]);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setActiveCardPopup(true);
  };
  const fetchAllSummaries = () => {
    getAllTrendies()
      .then((res: any) => {
        console.log(res.data);
        setSummaries(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllSummaries();
  }, []);

  return (
    <Section pt={"6"}>
      <Heading
        className="heading-primary font-thin"
        align={"center"}
        size={"8"}
      >
        Top 10 SummarEase
      </Heading>
      {/* Dialog for Video */}
      <Dialog.Root open={activeCardPopup}>
        <Dialog.Content
          style={{
            maxWidth: 1000,
            maxHeight: "750px",
            padding: 0,
            margin: 0,
            overflow: "hidden",
          }}
        >
          <Grid
            columns={"2"}
            // align={"center"}
            style={{ overflow: "hidden" }}
          >
            <Box style={{ overflowY: "hidden" }}>
              <Dialog.Title
                className="flex flex-row justify-between bg-primary px-4 py-3 gap-4"
                style={{ margin: "0 !important" }}
              >
                <Text className="text-white heading-primary my-0">
                  {summaries[activeCard]?.name}
                </Text>
                <IconButton
                  className="cursor-pointer"
                  style={{ backgroundColor: "white" }}
                  onClick={() => setActiveCardPopup(false)}
                >
                  <Cross1Icon color="black" fontWeight={"5"} />
                </IconButton>
              </Dialog.Title>
              <Dialog.Description
                size="2"
                mb="5"
                style={{ overflow: "hidden" }}
              >
                <Flex direction={"column"} gap={"5"}>
                  <Box>
                    <ReactPlayer
                      url={summaries[activeCard]?.video}
                      height={"400px"}
                      width={"full"}
                      controls={true}
                    />
                  </Box>
                  <Text size={"3"} align={"center"} className="px-4">
                    {summaries[activeCard]?.summary}
                  </Text>
                </Flex>
              </Dialog.Description>
            </Box>
            <PDFViewer pdfSrc={summaries[activeCard]?.document} />
            {/* <PdfViewer pdfSrc={"/first.pdf"} /> */}
          </Grid>
        </Dialog.Content>
      </Dialog.Root>
      <Flex wrap={"wrap"} justify={"center"} pt={"7"} gap={"5"}>
        {summaries.map((item: any, index: number) => (
          <Card
            variant="classic"
            color="crimson"
            key={index}
            className="carousel-slide cursor-pointer h-[300px]"
            onClick={(e) => {
              e.preventDefault();
              handleCardClick(index);
            }}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              gap={"4"}
            >
              {/* Video Container */}
              <Box className="bg-gray-200 flex items-center justify-center">
                <video
                  src={item?.video}
                  height={"200px"}
                  width={"400px"}
                  className="h-[180px] w-[350px]"
                />
              </Box>
              <Box className="flex align-center justify-center font-secondary">
                <Text size={"5"}>{item?.name}</Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Section>
  );
};

export default Trending;
