import React, { useEffect, useRef, useState } from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import ReactPlayer from "react-player";
// import AWS from "aws-sdk";
import { getAllSummaries } from "../Data/SummaryData";
import PdfViewer from "./PdfViewer"; // Assuming PDFViewer is properly exported from PdfViewer file

import {
  Box,
  IconButton,
  Section,
  Container,
  Text,
  Card,
  Flex,
  Dialog,
  Button,
} from "@radix-ui/themes";

// interface SlideItem {
//   name: string;
//   url: string;
// }

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<any>(undefined);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [summaries, setSummaries] = useState<any>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setActiveCardPopup(true);
  };

  const fetchAllSummaries = () => {
    getAllSummaries()
      .then((res: any) => {
        console.log(res.data);
        setSummaries(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllSummaries();
  }, []);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    scrollSlider(-1);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === summaries.length - 1 ? summaries.length - 1 : prevIndex + 1
    );
    scrollSlider(1);
  };

  const scrollSlider = (direction: number) => {
    if (containerRef.current) {
      const scrollAmount = direction * containerRef.current.offsetWidth;
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <Section className=" overflow-hidden border-t-2 !py-12 " mt={"7"}>
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
          <Flex
            direction={"row"}
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
            <PdfViewer pdfSrc={summaries[activeCard]?.document} />
            {/* <PdfViewer pdfSrc={"/first.pdf"} /> */}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Box className="relative">
        {/* Carousel */}
        <IconButton
          variant="solid"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white p-2 shadow-md"
          onClick={goToPreviousSlide}
          radius="full"
        >
          <CaretLeftIcon className="w-6 h-6" />
        </IconButton>

        {/* Slides */}
        <Container className="carousel-container px-8">
          <div
            ref={containerRef}
            className="carousel-wrapper flex flex-row gap-4 overflow-x-scroll hidescrollbar"
          >
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
          </div>
        </Container>

        {/* Next button */}
        <IconButton
          variant="solid"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={goToNextSlide}
          radius="full"
        >
          <CaretRightIcon className="w-6 h-6" />
        </IconButton>
      </Box>
    </Section>
  );
};

export default CustomSlider;
