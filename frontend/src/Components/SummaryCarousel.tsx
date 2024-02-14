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
  Inset,
  Heading,
  Flex,
} from "@radix-ui/themes";
import CardDialog from "./CardDialog";
import Loader from "./Loading";
import Slider from "react-slick";

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [summaries, setSummaries] = useState<any>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);

  let settings = {
    className: "slider variable-width slick-slider-container",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    nextArrow: (
      <IconButton
        variant="solid"
        className=" bg-white rounded-full p-2 shadow-md"
        radius="full"
      >
        <CaretRightIcon className="w-6 h-6" />
      </IconButton>
    ),
    prevArrow: (
      <IconButton
        variant="solid"
        className=" bg-white rounded-full p-2 shadow-md"
        radius="full"
      >
        <CaretRightIcon className="w-6 h-6" />
      </IconButton>
    ),
  };

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
    <Section className="overflow-hidden !py-12 ">
      {/* Dialog for Video */}
      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />
      <Box className="slider-container">
        <Slider {...settings}>
          {summaries.map((item: any, index: number) => (
            <Card
              size="2"
              style={{ maxWidth: 240 }}
              variant="classic"
              color="crimson"
              key={index}
              className="carousel-slide cursor-pointer shadow-lg !p-0"
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(index);
              }}
            >
              <Inset clip="padding-box" side="top" pb="current">
                <Box className="bg-gray-200 flex items-center justify-center !p-0">
                  <video
                    src={item?.video}
                    height={"200px"}
                    width={"400px"}
                    className="h-[180px] w-[350px]"
                  />
                </Box>
              </Inset>
              <Text
                as="p"
                size="5"
                className="font-primary text-center font-medium"
              >
                {item?.name}
              </Text>
            </Card>
          ))}
        </Slider>
      </Box>
    </Section>
  );
};

export default CustomSlider;
