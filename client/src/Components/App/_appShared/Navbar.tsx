import { Box, Button, Flex, Heading, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaVideo } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Box
      id="navbar-app"
      className="relative z-[2] text-white  p-3 !m-0 bg-[#30353c]  px-[50px] border-b-[1px] border-primary"
    >
      <Flex direction={"row"} align={"center"} justify={"between"}>
        {/* Logo */}
        <Heading as="h1" size={{ sm: "5", initial: "3" }}>
          <Flex
            direction={"row"}
            align={"end"}
            justify={"between"}
            className="logo"
          >
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="SummarEase Logo"
                height={25}
                width={25}
                className="!h-10 !w-24 md:!h-12 md:!w-28"
              />
            </Link>
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
              Favourites
            </Button>
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
