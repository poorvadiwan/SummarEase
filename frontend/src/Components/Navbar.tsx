import React from "react";
import { Container, Box, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Container id="navbar" className="bg-primary text-white">
      <Flex justify="between" align="center" py="4">
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
        <Box className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/trends" className="hover:underline">
            Top Summaries
          </Link>
          <Link to="/" className="hover:underline">
            Contact Us
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
