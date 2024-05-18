import { Box, Button, Flex, Heading, Strong, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <Box className="bg-primary">
            <Box
        className="relative border-[15px] border-primary rounded-se-[40px] rounded-es-[40px]"
        style={{
          height: "calc(100vh - 96px)",
        }}
      >
        {/* Content Area */}
        <Flex
          direction={"column"}
          align={"start"}
          justify={"center"}
          gap={"5"}
          className="absolute left-[50px] top-[22vh] "
        >
          {/* HEADER */}
          <Heading
            as="h1"
            weight={"bold"}
            className="!text-[12vw] header-primary !leading-none"
          >
            Summar
            <Text as="span" className="text-primary !text-[12vw]">
              Ease
            </Text>
          </Heading>

          {/* TEXT */}
          <Text className="!text-[1.5vw] !w-[32vw] block align-text-top !leading-[2vw] pl-4">
            Generate instant{" "}
            <Strong className="text-primary">video-summaries</Strong> for your
            long-format text documents hassle free!!{" "}
          </Text>

          {/* BUTTONS */}
          <Flex gap={"4"} className="pl-4">
            <Button
              size={{ md: "4", initial: "2" }}
              className="!bg-primary !font-bold"
            >
              {"Try Now ->"}
            </Button>
            <Button
              size={{ md: "4", initial: "2" }}
              className="!bg-[var(--gray-4)] !text-white !font-bold"
            >
              Learn More
            </Button>
          </Flex>
        </Flex>

        {/* Assets Area */}
        <Box className="absolute right-[15vw] top-[5vh] w-[20vw] h-[60vh] !bg-transparent">
          <Image
            src={"/assets/hourglass.svg"}
            className="!bg-transparent"
            alt="hourglass asset"
            fill={true}
          />
        </Box>

        <Box className="absolute right-[30vw] top-[65vh] w-[80px] h-[80px] !bg-transparent">
          <Image
            src={"/assets/video1.svg"}
            className="!bg-transparent"
            alt="Hero Image"
            fill={true}
          />
        </Box>

        <Box className="absolute right-[10vw] top-[45vh] w-[80px] h-[80px] !bg-transparent">
          <Image
            src={"/assets/video2.svg"}
            className="!bg-transparent"
            alt="Hero Image"
            fill={true}
          />
        </Box>

        <Box className="absolute right-[15vw] top-[67vh] w-[80px] h-[80px] !bg-transparent">
          <Image
            src={"/assets/video3.svg"}
            className="!bg-transparent"
            alt="Hero Image"
            fill={true}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Hero