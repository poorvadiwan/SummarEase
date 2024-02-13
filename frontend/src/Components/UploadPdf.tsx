import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  Dialog,
  TextField,
  Separator,
} from "@radix-ui/themes";
import { useDropzone } from "react-dropzone";
import { sendPDF } from "../Data/SummaryData";
import { sendSMS } from "../Data/Message";
import { toast } from "react-toastify";

const dummy = {
  document:
    "https://summar-ease.s3.amazonaws.com/documents/978-3-031-53302-0-1.pdf",
  id: "65c808a876b052d8a39eb347",
  name: "978-3-031-53302-0-1.pdf",
  summary:
    "The Internet of Multisensory, Multimedia and Musical Things (Io3MT) is a new concept that groups in a single place devices and data exploring the five human senses, multimedia aspects, and music content. In this paper, we advance the proposition of a theoretical alignment between the emerging domain of Io3MT and the field of Artiﬁcial Intelligence (AI). Our comprehensive analysis spans a spectrum of dimensions, encompassing the automated generation of multimedia content, the real-time extraction of sensory effects, and post-performance analytical strategies. We assert that this cooperative amalgamation has the potential to serve as a conduit for optimizing the creative capabilities of stakeholders. We hope that this study will spark further research on the subject.. The Internet of Multisensory, Multimedia, and Musical Things (Io3MT) is an emerging domain of research that focuses on the seamless interaction and exchange of multisensory, multimedia, and musical data between interconnected devices. The aim is to promote the automation and realization of various services, including artistic endeavors, entertainment applications, and educational and therapeutic contexts. This work explores the application of artificial intelligence (AI) techniques within the Io3MT environment to enhance the creative process. It highlights the inherent challenges and proposes future research directions. A layered architecture is proposed, comprising five distinct levels: the Things Layer, Link Layer, Network Layer, Middleware Layer, and Application Layer. Each layer is equipped with specific AI techniques to achieve its functional objectives. By adopting AI techniques, the Io3MT environment can become more intelligent, responsive, and interactive, leading to new artistic applications and experiences.",
  video:
    "https://summar-ease.s3.amazonaws.com/videos/ee5564c3-201b-46b7-b7d4-3c4d36ce3ec6.mp4",
};

const UploadPdf = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pdfResult, setPdfResult] = useState<any>(dummy);
  const [enterNumberDialog, setEnterNumberDialog] = useState<any>(false);
  const [mobNumber, setModNumber] = useState<string>("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const handleSubmit = () => {
    // POST PDF TO BACKEND FOR PROCESSING
    // OPEN DIALOG FOR EMAIL ENTRY
    // CALL VONAGE TO SEND MAIL
    console.log(selectedFiles);
    // costly api call
    sendPDF(selectedFiles[0])
      .then((res: any) => {
        setPdfResult(res?.data);
        sendSMS(res?.data.document);
      })
      .catch((err) => {
        console.log(err);
      });
    setEnterNumberDialog(true);
    setSelectedFiles([]);
  };

  const files = selectedFiles.map((file: any) => (
    <li key={file?.path} className="font-bold text-xl">
      {file?.path}
    </li>
  ));

  useEffect(() => {
    console.log(pdfResult);
    // sendSMS(pdfResult?.document);
    // window.location.reload();
  }, [pdfResult]);

  return (
    <Flex align="center" direction="column" className="mt-8 px-4 ">
      {/* Dialog for submition */}
      <Dialog.Root open={enterNumberDialog}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Enter Your Details</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Give your information so we can notify you about your SummarEase.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue="John/Jane Doe"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Mobile
              </Text>
              <TextField.Input
                defaultValue="7987746758"
                value={mobNumber}
                onChange={(e) => setModNumber(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setEnterNumberDialog(false);
                }}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  toast.info("We will send you your video to your email.");
                  setEnterNumberDialog(false);
                }}
              >
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Main Headings */}
      <Box className="flex flex-col gap-4 align-center font-secondary">
        <Heading
          size={"8"}
          align="center"
          weight={"regular"}
          className="header-primary"
        >
          Upload Your File
        </Heading>
        <Heading
          size={"5"}
          align="center"
          weight={"medium"}
          className="header-primary"
        >
          Understand your documents better and in style
        </Heading>
      </Box>
      <Box className="flex flex-col gap-0 align-center justify-center p-4 border-2 border-gray-600 border-dashed w-[60vw] mt-8 rounded-xl">
        {/* DROPZONE */}
        <label
          htmlFor="fileInput"
          className="flex flex-col gap-8 h-44 cursor-pointer"
          {...getRootProps()}
        >
          <Box className="h-full w-full flex align-center justify-center">
            <input {...getInputProps()} />
            {selectedFiles.length > 0 ? (
              <Flex align={"center"} justify={"center"} gap="2">
                <img src="/pdf.png" alt="PDF" className="h-12 w-12" />
                <ul>{files}</ul>
              </Flex>
            ) : isDragActive ? (
              <Flex align={"center"} justify={"center"}></Flex>
            ) : (
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <img
                  src={"/upload.png"}
                  className="h-24 w-24"
                  alt="Drop your pdfs here..."
                />
                <Text>Drag and Drop Pdfs Here</Text>
              </Flex>
            )}
          </Box>
        </label>
      </Box>

      <Box className="self-center flex flex-row gap-4 mt-4">
        {selectedFiles.length > 0 ? (
          <>
            <Button variant="solid" size={"4"} onClick={handleSubmit}>
              Submit
            </Button>

            <Button
              variant="outline"
              size={"4"}
              color="crimson"
              onClick={() => {
                setSelectedFiles([]);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="solid" size={"4"} onClick={open}>
              Select File
            </Button>
          </>
        )}
      </Box>

      <Separator size="4" mt={"9"} />
    </Flex>
  );
};

export default UploadPdf;
