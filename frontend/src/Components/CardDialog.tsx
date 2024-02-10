import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, Dialog, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import PdfViewer from "./PdfViewer";

interface CardDialogProps {
  summaries: any[];
  activeCard: number;
  activeCardPopup: boolean;
  handleActiveCardPopup: (arg: boolean) => void;
}

const CardDialog: React.FC<CardDialogProps> = ({
  summaries,
  activeCard,
  activeCardPopup,
  handleActiveCardPopup,
}) => {
  return (
    <Dialog.Root open={activeCardPopup}>
      <Dialog.Content
        style={{
          maxWidth: 1000,
          maxHeight: "750px",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}
      >
        <Grid columns={"2"} style={{ overflow: "hidden" }}>
          <Box style={{ overflowY: "auto" }}>
            <Dialog.Title
              className="flex flex-row justify-between bg-primary px-4 py-3 gap-4"
              style={{ margin: "0 !important" }}
            >
              <Text className="text-white heading-primary my-0">
                {summaries[activeCard]?.name}
              </Text>
              <IconButton
                className="cursor-pointer"
                style={{ backgroundColor: "white" }}
                onClick={() => handleActiveCardPopup(false)}
              >
                <Cross1Icon color="black" fontWeight={"5"} />
              </IconButton>
            </Dialog.Title>
            <Dialog.Description
              size="2"
              mb="5"
              style={{ overflowY: "auto", height: "700px" }}
            >
              <Flex direction={"column"} gap={"5"} style={{ height: "100%" }}>
                <Box style={{ height: "50%" }}>
                  <ReactPlayer
                    url={summaries[activeCard]?.video}
                    height={"100%"}
                    width={"full"}
                    controls={true}
                  />
                </Box>
                <Text
                  size={"3"}
                  align={"center"}
                  className="px-4 overflow-y-auto"
                  style={{ height: "50%" }}
                >
                  {summaries[activeCard]?.summary}
                </Text>
              </Flex>
            </Dialog.Description>
          </Box>
          <PdfViewer pdfSrc={summaries[activeCard]?.document} />
          {/* <PdfViewer pdfSrc={"/first.pdf"} /> */}
        </Grid>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CardDialog;
