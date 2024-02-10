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
  Grid,
} from "@radix-ui/themes";
import CardDialog from "./CardDialog";
import Loader from "./Loading";

// interface SlideItem {
//   name: string;
//   url: string;
// }

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [summaries, setSummaries] = useState<any>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setActiveCardPopup(true);
  };

  const fetchAllSummaries = () => {
    getAllSummaries()
      .then((res: any) => {
        setIsLoading(true);
        console.log(res.data);
        setSummaries(res?.data);
        setIsLoading(false);
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
      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />

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
            {isLoading ? (
              <Box className="flex w-full justify-center">
                <Loader />
              </Box>
            ) : (
              summaries.map((item: any, index: number) => (
                <Card
                  variant="classic"
                  color="crimson"
                  key={index}
                  className="carousel-slide cursor-pointer h-[300px] shadow-lg"
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
              ))
            )}
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
