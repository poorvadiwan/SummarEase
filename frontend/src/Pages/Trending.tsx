import React, { useEffect, useState } from "react";
import { getAllTrendies } from "../Data/SummaryData";
import CardDialog from "../Components/CardDialog";
import Loader from "../Components/Loading";
import { Box, Card, Flex, Heading, Section, Text } from "@radix-ui/themes";

const Trending: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setActiveCardPopup(true);
  };

  const fetchAllSummaries = () => {
    getAllTrendies()
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

  if (isLoading) {
    return (
      <Box className="w-screen flex align-center my-36 justify-center">
        <Loader />
      </Box>
    );
  }

  return (
    <Section pt={"6"}>
      <Heading
        size={"8"}
        align="center"
        weight={"regular"}
        className="header-primary"
      >
        Top 10 SummarEase
      </Heading>

      <CardDialog
        summaries={summaries}
        activeCard={activeCard}
        activeCardPopup={activeCardPopup}
        handleActiveCardPopup={(arg: boolean) => setActiveCardPopup(arg)}
      />

      <Flex wrap={"wrap"} justify={"center"} pt={"7"} gap={"5"}>
        {summaries.map((item: any, index: number) => (
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
