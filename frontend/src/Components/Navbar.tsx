import React from "react";
import { Container, Box, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import UploadPdf from "./UploadPdf";

const Navbar: React.FC = () => {
  return (
    <Box id="navbar" className="relative text-white w-screen !px-8 !m-0">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="bg_video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      <Flex
        justify="between"
        align="center"
        py="4"
        className="relative z-10 w-5/6 mx-auto"
      >
        <Box id="logo">
          <Heading
            size={"7"}
            weight="medium"
            className="header-primary flex flex-row gap-2 align-center justify-center"
          >
            <img src="/Logo.png" className="h-8 w-8" alt="Logo" />
            SummarEase
          </Heading>
        </Box>
        <Box className="space-x-6">
          <Link to="/" className="hover:underline text-lg">
            Home
          </Link>
          {/* <Link to="/trends" className="hover:underline text-lg">
            Trending
          </Link> */}
          <Link to="/" className="hover:underline text-lg">
            Contact Us
          </Link>
        </Box>
      </Flex>
      <Box className="relative z-10">
        <UploadPdf />
      </Box>
    </Box>
  );
};

export default Navbar;
