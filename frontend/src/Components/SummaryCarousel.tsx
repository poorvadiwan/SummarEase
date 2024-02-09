import React, { useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import ReactPlayer from "react-player";
import {
  Box,
  IconButton,
  Section,
  Container,
  Text,
  Card,
  Flex,
} from "@radix-ui/themes";

interface SlideItem {
  title: string;
  url: string;
}

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items: SlideItem[] = [
    {
      title: "RSA Encryption and Quantum Computing",
      url: "https://youtu.be/AdaFim3Dlh8?si=Xoe4D0e-H9gxr8RR",
    },
    {
      title: "RSA Encryption and Quantum Computing",
      url: "https://youtu.be/2-c2448GzBI?si=IMXYJGhE-D5WDLKw",
    },
    // Add more items here if needed
  ];

  const totalItems = items.length;

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Section className="relative overflow-hidden border-t-2 " pt={"7"} mt={"7"}>
      {/* Previous button */}
      <IconButton
        variant="solid"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white p-2 shadow-md"
        onClick={goToPreviousSlide}
        radius="full"
      >
        <CaretLeftIcon className="w-6 h-6" />
      </IconButton>

      {/* Slides */}
      <Container className="carousel-container px-12">
        <div
          className="carousel-wrapper flex flex-row items-center justify-center gap-4"
          style={{
            transform: `translateX(-${
              (currentIndex % totalItems) * (100 / totalItems)
            }%)`,
          }}
        >
          {items.map((item, index) => (
            <Card key={index} className="carousel-slide">
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                gap={"4"}
              >
                {/* Video Container */}
                <Box className="bg-gray-200 flex items-center justify-center">
                  <ReactPlayer
                    url={item.url}
                    height={"200px"}
                    width={"400px"}
                  />
                </Box>
                <Box className="flex align-center justify-center font-secondary">
                  <Text size={"5"}>{item.title}</Text>
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
    </Section>
  );
};

export default CustomSlider;
