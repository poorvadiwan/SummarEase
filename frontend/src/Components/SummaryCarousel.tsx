import React, { useEffect, useRef, useState } from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronRightIcon,
  Cross1Icon,
  HeartIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { getAllSummaries } from "../Data/SummaryData";
import { Box, IconButton, Section, Text, Flex, Button } from "@radix-ui/themes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardDialog from "./CardDialog";

const CustomSlider: React.FC = () => {
  const [summaries, setSummaries] = useState<any>([]);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [updateCount, setUpdateCount] = useState(0);

  let sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const fetchAllSummaries = () => {
    getAllSummaries()
      .then((res: any) => {
        setSummaries(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllSummaries();
  }, []);

  let settings = {
    // className: "slider variable-width slick-slider-container",
    // dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current: any, next: any) => setSlideIndex(next),

    // nextArrow: <Button className="text-red">Click</Button>,
    // prevArrow: (
    // <IconButton
    //   variant="solid"
    //   className=" bg-white rounded-full p-2 shadow-md"
    //   radius="full"
    // >
    //   <CaretRightIcon className="w-6 h-6" />
    // </IconButton>
    // ),
  };

  return (
    <Section className="overflow-hidden !p-0 w-screen">
      <Box className="relative w-100 align-center justify-center">
        <CardDialog
          summaries={summaries}
          activeCard={activeCard}
          activeCardPopup={activeCardPopup}
          handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
        />
        <IconButton
          variant="solid"
          size={"4"}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-20 bg-white rounded-full p-2 shadow-md !cursor-pointer"
          radius="full"
          onClick={() => {
            console.log(sliderRef);
            if (sliderRef.current) {
              (sliderRef.current as any)?.slickPrev();
            }
          }}
        >
          <CaretLeftIcon width={45} height={45} />
        </IconButton>
        <Slider {...settings} ref={sliderRef} className="w-screen mx-auto">
          {summaries.map((item: any, index: number) => (
            <Box key={index} className="relative">
              <video
                className="h-[300px] video-element w-full bg-black border-2"
                muted
                autoPlay={false}
                loop
                playsInline
              >
                <source src={item?.video} type="video/mp4" />
              </video>
              <Flex
                direction="column"
                justify="between"
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
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
        </Slider>
        <IconButton
          variant="solid"
          size={"4"}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-20 bg-white rounded-full shadow-md !cursor-pointer"
          radius="full"
          onClick={() => {
            console.log(sliderRef);
            if (sliderRef.current) {
              (sliderRef.current as any)?.slickNext();
            }
          }}
        >
          <CaretRightIcon width={45} height={45} />
        </IconButton>
      </Box>
    </Section>
  );
};

export default CustomSlider;
