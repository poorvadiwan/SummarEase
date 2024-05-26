"use client";

import Page from "@/Components/_shared/Page";
import { getAllSummaries } from "@/Data/SummaryData";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFlag } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import ReactPlayer from "react-player";

type Props = {};

const PageComponent: React.FC<Props> = () => {
  const pathname = usePathname();
  const videoId = pathname.split("/").pop();
  const [video, setVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);

  useEffect(() => {
    // Fetch video details using videoId
    getAllSummaries().then((data) => {
      console.log(data[0]); // For now let me get the video details like this, later I'll change it to get by Id
      setVideo(data[0]);
      setIsLoading(false);
    });
  }, [videoId]);

  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary);
  };

  const summary =
    video?.summary ||
    "This is a placeholder for the summary. The actual summary text will be 400-500 words long.";
  const truncatedSummary = summary.split(" ").slice(0, 50).join(" ");

  const dummyComments = [
    {
      username: "John Doe",
      comment: "Great video! Learned a lot from it.",
      avatar: "",
    },
    {
      username: "Jane Smith",
      comment: "Thanks for sharing this valuable information.",
      avatar: "",
    },
    {
      username: "Alice Johnson",
      comment: "Could you please explain more about the third point?",
      avatar: "",
    },
  ];

  const suggestedVideos = [
    {
      thumbnail: "",
      title: "How to Learn JavaScript",
      creator: "John Doe",
      views: "1M views",
      createdAt: "2 days ago",
    },
    {
      thumbnail: "",
      title: "React.js Tutorial for Beginners",
      creator: "Jane Smith",
      views: "500K views",
      createdAt: "3 days ago",
    },
    {
      thumbnail: "",
      title: "Understanding CSS Grid",
      creator: "Alice Johnson",
      views: "300K views",
      createdAt: "5 days ago",
    },
  ];

  if (isLoading) {
    return (
      <Page className="!py-8 px-4 md:px-[40px]">
        <Flex direction={"column"} align={"center"} gap={"4"}>
          {/* Video Container */}
          <Box className=" w-full md:h-[38vw] h-[60vw] bg-black">
            <Skeleton width={"100%"} height={"100%"} />
          </Box>

          {/* Title(left), [Like, Share, Download](right) */}
          <Box className="w-full pr-4">
            <Flex direction={"row"} align={"center"} justify={"between"}>
              {/* Title */}
              <Skeleton width={"60%"} height={"40px"} />

              {/* Like, Share, Download buttons */}
              <Flex direction={"row"} align={"center"} gap={"2"}>
                <Skeleton width={"30px"} height={"30px"} />
                <Skeleton width={"30px"} height={"30px"} />
                <Skeleton width={"30px"} height={"30px"} />
              </Flex>
            </Flex>
          </Box>

          {/* Summary, comment and suggested videos */}
          <Box className="w-full mt-1">
            <Grid
              columns={{ md: "3", initial: "1" }}
              gapX={"6"}
              className="g"
              gap={"4"}
            >
              {/* Summary and Comments */}
              <Flex
                direction={"column"}
                gap={"4"}
                align={"center"}
                className="w-full grid-cols-subgrid col-span-2"
              >
                {/* Summary */}
                <Box className="mb-4 w-full p-4 rounded-lg !bg-[var(--gray-4)]">
                  <Skeleton width={"100%"} height={"250px"} />
                </Box>

                {/* Comments */}
                <Box className="w-full md:mt-8 mt-4">
                  <Skeleton width={"100%"} height={"40px"} />

                  {/* Add Comment Bar */}
                  <Skeleton width={"100%"} height={"100px"} />

                  {/* Comment List */}
                </Box>
              </Flex>
            </Grid>
          </Box>
        </Flex>
      </Page>
    ); // or any loading indicator
  }

  return (
    <Page className="!py-8 px-4 md:px-[45px]">
      <Flex direction={"column"} align={"center"} gap={"4"}>
        {/* Video Container */}
        <Box className="big-video-player w-full md:h-[38vw] h-[60vw] bg-black border-[1px] border-[#E5E5E550]">
          <ReactPlayer
            key={"youtube"}
            url={video ? video.video : ""}
            light={video ? video.thumbnail ?? "/Logo.svg" : ""}
            controls={true}
            width="100%"
            height="100%"
          />
        </Box>

        {/* Title(left), [Like, Share, Download](right) */}
        <Box className="w-full pr-2">
          <Flex direction={"row"} align={"center"} justify={"between"}>
            {/* Title */}
            <Heading
              as="h1"
              size={{ md: "6", initial: "4" }}
              weight={"medium"}
              className="!font-secondary"
            >
              {video.name ?? "Title"}
            </Heading>

            {/* Like, Share, Download buttons */}
            <Flex
              direction={"row"}
              align={"center"}
              gap={{ md: "5", initial: "3" }}
            >
              <IconButton
                variant="ghost"
                size={"3"}
                onClick={() => setLiked((prev) => !prev)}
              >
                {liked ? (
                  <GoHeartFill className="md:text-2xl text-xl" />
                ) : (
                  <GoHeart className="md:text-2xl text-xl" />
                )}
              </IconButton>
              <IconButton
                variant="ghost"
                size={"3"}
                onClick={() => setLiked((prev) => !prev)}
              >
                <IoShareSocial className="md:text-2xl text-xl" />
              </IconButton>
              <IconButton
                variant="ghost"
                size={"3"}
                onClick={() => setLiked((prev) => !prev)}
              >
                <FiDownload className="md:text-2xl text-xl" />
              </IconButton>
            </Flex>
          </Flex>
        </Box>

        {/* Summary, comment and suggested videos */}
        <Box className="w-full mt-1">
          <Grid
            columns={{ md: "3", initial: "1" }}
            gapX={"6"}
            className="g"
            gap={"4"}
          >
            {/* Summary and Comments */}
            <Flex
              direction={"column"}
              gap={"4"}
              align={"center"}
              className="w-full grid-cols-subgrid col-span-2"
            >
              {/* Summary */}
              <Box className="mb-4 w-full p-4 rounded-lg !bg-[var(--gray-4)]">
                <Heading as="h3" className="md:text-xl text-lg font-bold">
                  Summary
                </Heading>
                <Box className="mt-2">
                  <Text as="p">
                    {showFullSummary ? summary : truncatedSummary}
                    {!showFullSummary && (
                      <Text
                        as="span"
                        className="hover:underline pl-2 text-secondary"
                        onClick={toggleSummary}
                      >
                        ...more
                      </Text>
                    )}
                  </Text>

                  {showFullSummary && (
                    <Text
                      as="p"
                      className="hover:underline pt-2 text-secondary"
                      onClick={toggleSummary}
                    >
                      Show less
                    </Text>
                  )}
                </Box>
              </Box>

              {/* Comments */}
              <Box className="w-full md:mt-8 mt-4">
                <Heading as="h4" className="md:text-xl text-lg font-bold mb-2">
                  Comments
                </Heading>

                {/* Add Comment Bar */}
                <Flex align={"center"} className="mb-4 w-full">
                  <Image
                    src="/assets/avatar.svg"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <input
                    type="text"
                    placeholder="Add a public comment..."
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    variant="soft"
                    size={{ md: "3", initial: "2" }}
                    className="ml-2 !py-6"
                  >
                    Comment
                  </Button>
                </Flex>

                {/* Comment List */}
                <ul className="!mt-6">
                  {dummyComments.map((comment, index) => (
                    <li key={index} className="flex items-start mb-4">
                      <Image
                        src={comment.avatar || "/Logo.svg"}
                        alt={`${comment.username}'s avatar`}
                        width={36}
                        height={36}
                        className="rounded-full mr-4 !bg-black"
                      />
                      <div className="flex-grow">
                        <Flex justify="between" align="center">
                          <Text as="p" className="font-semibold">
                            {comment.username}
                          </Text>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <IconButton
                                variant="ghost"
                                className="hover:!bg-none"
                              >
                                <DotsVerticalIcon />
                              </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                              <DropdownMenu.Item>
                                <FaFlag /> Report
                              </DropdownMenu.Item>
                              {/* <DropdownMenu.Item>Delete</DropdownMenu.Item> */}
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </Flex>
                        <Text as="p">{comment.comment}</Text>
                      </div>
                    </li>
                  ))}
                </ul>
              </Box>
            </Flex>

            {/* Suggested Videos */}
            <Flex direction={"column"} gap={"4"} className="w-full">
              <h2 className="text-xl font-bold mb-4">Suggested Videos</h2>
              <ul>
                {suggestedVideos.map((video, index) => (
                  <li key={index} className="flex mb-4">
                    <Image
                      src={video.thumbnail || "/assets/thumbnail.svg"}
                      alt={video.title}
                      width={160}
                      height={90}
                      className="rounded-lg mr-4"
                    />
                    <div className="flex-grow">
                      <Heading as="h4" className="font-bold text-lg mb-1">
                        {video.title}
                      </Heading>
                      <Text as="p" className="text-sm text-gray-500">
                        {video.creator}
                      </Text>
                      <Flex align="center" className="text-sm text-gray-500">
                        <Text as="span" className="mr-2">
                          {video.views}
                        </Text>
                        <Text as="span">{video.createdAt}</Text>
                      </Flex>
                    </div>
                  </li>
                ))}
              </ul>
            </Flex>
          </Grid>
        </Box>
      </Flex>
    </Page>
  );
};

export default PageComponent;
