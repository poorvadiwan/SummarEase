import React from "react";
import { Container, Box, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Container id="navbar" className="bg-primary text-white">
      <Flex justify="between" align="center" py="4">
        <Box id="logo">
          <Heading weight="medium">SummarEase</Heading>
        </Box>
        <Box className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/" className="hover:underline">
            About
          </Link>
          <Link to="/" className="hover:underline">
            Contact
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
