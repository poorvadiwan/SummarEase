import React, { useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import ReactPlayer from "react-player";
import AWS from "aws-sdk";
// import

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

interface SlideItem {
  title: string;
  url: string;
}

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<any>(undefined);
  const [activeCardPopup, setActiveCardPopup] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  const s3 = new AWS.S3({
    accessKeyId: "AKIA54UC2W66RRHWWIP6",
    secretAccessKey: "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",
  });

  const listObjectsInBucket = () => {
    // Create the parameters for calling listObjects
    // var bucketParams = {
    //   Bucket: "summar-ease",
    //   Prefix: "videos/",
    // };

    // // Call S3 to obtain a list of the objects in the bucket
    // s3.listObjects(bucketParams, function (err: any, data: any) {
    //   if (err) {
    //     console.log("Error", err);
    //   } else {
    //     // const filterData = data.Contents.filter((item: any) => {
    //     //   if (item.Key.includes("videos/")) {
    //     //     return item;
    //     //   }
    //     // });
    //     console.log(data.Contents);
    //   }
    // });
    const params = {
      Bucket: "summar-ease",
      ExpressionType: "SQL",
      Key: "videos/",
      Expression: `select count(*) as number_of_rows FROM S3Object`,
      InputSerialization: {
        CSV: {
          FileHeaderInfo: "USE",
          RecordDelimiter: "\n",
          FieldDelimiter: ",",
          AllowQuotedRecordDelimiter: true,
        },
      },
      OutputSerialization: {
        CSV: {
          FieldDelimiter: ",",
          RecordDelimiter: "\n",
        },
      },
    };

    s3.selectObjectContent(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setActiveCardPopup(true);
  };

  useEffect(() => {
    // listObjectsInBucket();
  }, []);

  const items: SlideItem[] = [
    {
      title: "RSA Encryption and Quantum Computing",
      url: "/output.mp4",
    },
    {
      title: "This is somwthing more incredible",
      url: "/output.mp4",
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
      <Dialog.Root open={activeCardPopup}>
        <Dialog.Content style={{ maxWidth: 600 }}>
          <Dialog.Title align={"center"}>
            {items[activeCard].title}
          </Dialog.Title>
          <Dialog.Description size="2" my="4">
            <Flex direction={"column"} gap={"5"}>
              <Box>
                <ReactPlayer
                  url={"/output.mp4"}
                  height={"300px"}
                  width={"550px"}
                  controls={true}
                />
              </Box>
              <Text size={"3"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                omnis velit quisquam hic aliquam qui fugiat quia totam rerum
                tenetur accusamus, magni distinctio. Vero autem aliquam amet, ex
                repellat, molestiae delectus odit fuga necessitatibus maxime ad
                totam? Itaque illo eos voluptatum quod! Quos placeat iste illo
                dolore ad, ab expedita rerum quis, aliquam corporis minima
                delectus cumque harum amet magni optio, explicabo fugiat aliquid
                at quisquam pariatur neque nisi laboriosam? Labore est error
                ullam in dolorum hic, impedit, sit quod eaque nisi tempora at
                perferendis, mollitia fugit suscipit accusantium assumenda
                facilis quaerat cum neque vitae ut dolorem necessitatibus eos?
                Eveniet!
              </Text>
            </Flex>
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setActiveCardPopup(false)}
              >
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
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
            <Card
              key={index}
              className="carousel-slide"
              onClick={() => handleCardClick(index)}
            >
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                gap={"4"}
              >
                {/* Video Container */}
                <Box className="bg-gray-200 flex items-center justify-center">
                  <video src={"/output.mp4"} height={"200px"} width={"400px"} />
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
