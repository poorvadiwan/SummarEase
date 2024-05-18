import { Box, Button, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { FaHamburger } from "react-icons/fa";
import { FaStar, FaVideo } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <Box id="navbar" className="relative text-white w-full p-6 px-[50px]">
      <Flex direction={"row"} align={"center"} justify={"between"}>
        {/* Logo */}
        <Heading as="h1" size={{ sm: "5", initial: "3" }}>
          <Flex
            direction={"row"}
            align={"end"}
            justify={"between"}
            className="logo"
          >
            <Image
              src="/logo.svg"
              alt="SummarEase Logo"
              height={25}
              width={25}
              className="!h-10 !w-24 md:!h-12 md:!w-28"
            />
            {/* <Text
              size={{ sm: "7", initial: "5" }}
              weight={"bold"}
              className="!header-primary !leading-none"
            >
              ase
            </Text> */}
          </Flex>
        </Heading>

        {/* Nav Items */}
        <nav role="navigation">
          <Flex
            direction={"row"}
            align={"center"}
            gap={"6"}
            display={{ sm: "flex", initial: "none" }}
          >
            <Button variant={"ghost"} className="!text-white" size={"4"}>
              <FaVideo />
              Video Library
            </Button>
            <Button variant={"ghost"} className="!text-white" size={"4"}>
              <FaStar />
              Pricing
            </Button>
            <Flex direction={"row"} align={"center"} gap={"4"}>
              <Button
                variant={"soft"}
                className="!text-white !bg-[var(--gray-4)]"
                size={"3"}
              >
                Sign In
              </Button>
              <Button
                variant={"soft"}
                className="!text-black !bg-primary"
                size={"3"}
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </nav>

        {/* Nav Items in Smaller device */}
        <Box display={{ sm: "none", initial: "block" }}>
          <IconButton
            variant="ghost"
            size={"4"}
            className="hover:bg-[var(--gray-4)]"
          >
            <RiMenu2Fill
              size={"30"}
              className="!text-primary hover:bg-[var(--gray-4)]"
            />
          </IconButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
