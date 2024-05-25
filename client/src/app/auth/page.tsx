"use client";

import Page from "@/Components/_shared/Page";
import { Box, Button, Flex, Grid, Heading, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Page className="fixed z-[1] top-0 h-screen w-screen bg-[url('/AuthBg.jpg')] bg-cover bg-center">
      <Box className="fixed z-[2] top-0 h-screen w-screen bg-[#1B1D20] opacity-70"></Box>

      <Grid
        columns={{ md: "1fr 1fr", initial: "1" }}
        align={"center"}
        justify={"center"}
        className="fixed z-[3] top-0 h-screen w-screen"
      >
        {/* Title and Logo */}
        <Box id="authLogo" className="mx-auto w-fit">
          <Flex direction={"column"} align={"start"} gap={"5"}>
            <Flex direction={"row"} align={"center"} gap={"5"} className="logo">
              <Image src={"/Logo.svg"} alt="SE" height={"56"} width={"71"} />
              <Heading
                as="h1"
                weight={"bold"}
                className="text-[#fff] !leading-none align-baseline !font-secondary !text-[44px]"
              >
                SummarEase
              </Heading>
            </Flex>
            <Box className="tagline ">
              <Heading
                as="h2"
                weight={"medium"}
                size={"5"}
                className="text-[#fff] !leading-none !font-secondary"
              >
                Login or Create Account
              </Heading>
            </Box>
          </Flex>
        </Box>

        {/* Login Form */}
        <Box
          id="authForm"
          className="w-full !flex !items-center !justify-center"
        >
          <Box className="form-card rounded-lg h-[600px] md:!w-[500px] !w-[90%] bg-white">
            <Flex direction={"column"} className="p-8">
              {/* create account using google, facebook, apple id */}
              <Box className="w-full p-5 border-b-[1px] border-[#EAEAEA]">
                <Flex
                  direction={"column"}
                  align={"start"}
                  gap={"6"}
                  className="relative"
                >
                  <Heading
                    as="h3"
                    weight={"bold"}
                    size={"8"}
                    className="text-[#333] !leading-none !font-secondary"
                  >
                    Create an Account
                  </Heading>
                  <Box className="!flex !justify-center gap-6 pb-6">
                    <Image
                      src={"/assets/Google.svg"}
                      alt="Google"
                      height={"52"}
                      width={"52"}
                    />
                    <Image
                      src={"/assets/Facebook.svg"}
                      alt="Facebook"
                      height={"52"}
                      width={"52"}
                    />
                    <Image
                      src={"/assets/Apple.svg"}
                      alt="Apple"
                      height={"52"}
                      width={"52"}
                    />
                  </Box>
                  <Box className="text-center absolute left-1/2 -translate-x-1/2 bottom-[-40px]">
                    <Heading
                      as="h3"
                      weight={"light"}
                      size={"5"}
                      className="text-[#333] bg-white z-[4] p-2 !leading-none !font-secondary"
                    >
                      Or
                    </Heading>
                  </Box>
                </Flex>
              </Box>

              {/* Login Form */}
              <Box className="p-4 my-8">
                {/* form heading */}
                <Box className="mb-6 ">
                  <Flex direction={"column"} gap="2">
                    <Heading
                      as="h4"
                      weight={"bold"}
                      size={"3"}
                      className="text-[#333] !leading-none !font-secondary"
                    >
                      Sign up with email
                    </Heading>
                    <Heading
                      as="h5"
                      weight={"light"}
                      size={"3"}
                      className="text-[#333] !leading-none !font-secondary"
                    >
                      Already have an account?{" "}
                      <Link href="/auth/signin" className="text-sm underline">
                        Sign In
                      </Link>
                    </Heading>
                  </Flex>
                </Box>

                {/* Main form */}
                <form>
                  <Box className="mb-6">
                    <label
                      htmlFor="email"
                      className="text-[#333] text-sm !font-secondary"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-2 text-black border-b-[1px] border-[#1473E6] bg-white rounded-none focus:border-0 focus:!border-secondary"
                    />
                  </Box>
                  <Box className="mb-6">
                    <label
                      htmlFor="password"
                      className="text-[#333] text-sm !font-secondary"
                    >
                      Password
                    </label>
                    <Box className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-2 text-black border-b-[1px] border-[#1473E6] bg-white rounded-none focus:border-0 focus:!border-secondary"
                      />
                      <IconButton
                        className="!absolute !bg-[#1473E6] !top-[-6px] !right-0 focus:outline-none text-black"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FaEye color="black" className="h-5 w-5" />
                        ) : (
                          <FaEyeSlash color="black" className="h-5 w-5" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Box className="float-right">
                    <Button className="px-4 py-2 !bg-[#1473E6] !font-bold !text-white !rounded-2xl">
                      Continue
                    </Button>
                  </Box>
                </form>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Page>
  );
};

export default Auth;
