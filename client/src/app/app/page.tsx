"use client";

import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Page from "@/Components/_shared/Page";
import { Flex, Heading, Button, Text, Progress, Box } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { sendPDF } from "@/Data/SummaryData";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoStatus, setVideoStatus] = useState("Summarizing");
  const [videoResponse, setVideoResponse] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/vnd.ms-powerpoint": [],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [],
      "text/plain": [],
    },
    multiple: false,
  });

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles[0]) {
      setFile(selectedFiles[0]);
    }
  };

  const simulateProgress = (
    start: number,
    end: number,
    duration: number,
    callback: (progress: number) => void,
    onComplete?: () => void
  ) => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      callback(start + (end - start) * progress);
      if (now < endTime) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    requestAnimationFrame(step);
  };

  const simulateVideoProgress = () => {
    const interval = setInterval(() => {
      setVideoProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return 95;
        }
        let newProgress = prevProgress + Math.random() * 5;
        if (newProgress > 95) {
          newProgress = 95;
        }
        if (newProgress < 30) {
          setVideoStatus("Summarizing");
        } else if (newProgress < 70) {
          setVideoStatus("Visualizing");
        } else if (newProgress < 95) {
          setVideoStatus("Generating");
        }
        return newProgress;
      });
    }, 500);
    return () => clearInterval(interval);
  };

  const handleSubmit = async () => {
    if (file) {
      setUploading(true);

      // Simulate upload progress
      simulateProgress(
        0,
        100,
        10000,
        (progress) => {
          setUploadProgress(progress);
        },
        async () => {
          // Once upload is complete, start the video generation process
          setVideoProgress(0);
          setVideoStatus("Summarizing");

          const stopSimulation = simulateVideoProgress();

          try {
            const response = await sendPDF(
              file,
              "shukla.vaibhav1077@gmail.com"
            );
            setVideoResponse(response);

            // Complete the progress once we get the response
            setVideoProgress(100);
            setVideoStatus("Completed");
            stopSimulation();
          } catch (error) {
            console.error("Error during file processing:", error);
            stopSimulation();
          }  
        }
      );
    } else {
      document.getElementById("fileInput")?.click();
    }
  };

  return (
    <Page className="lg:w-5/6 mx-auto">
      {!uploading ? (
        <Flex direction="column" align="center" gap="5">
          {/* Heading */}
          <Heading
            as="h1"
            size="9"
            align="center"
            weight="regular"
            className="!font-secondary"
          >
            Summarize Documents
          </Heading>
          {/* Tagline */}
          <Heading as="h2" size="6" align="center" weight="medium">
            Your tool to summarize documents in style. Just input your document
            and we will summarize it for you.
          </Heading>
          {/* Input Button */}
          <Button
            size="4"
            onClick={() => handleSubmit()}
            className={`!text-3xl !py-8 !px-24 !font-secondary ${
              file ? "!bg-primary" : "!bg-secondary"
            }`}
          >
            {file ? "Submit" : "Select File"}
          </Button>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          />
          {/* Dropbox */}
          <div
            {...getRootProps()}
            className={`dropbox ${isDragActive ? "active" : ""}`}
            style={{
              border: file
                ? "2px dashed var(--secondary-color)"
                : "2px dashed #ccc",
              padding: "20px",
              width: "100%",
              height: "calc(100vh - 470px)",
              textAlign: "center",
              margin: "20px 0",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <>
                <Image
                  src="/assets/pdfFile.svg"
                  alt="File Upload"
                  width="350"
                  height="250"
                ></Image>
                <Text as="p" className="font-bold txt-lg">
                  {file.name}
                </Text>
              </>
            ) : isDragActive ? (
              <>
                <Image
                  src="/assets/dropHere.svg"
                  alt="File Upload"
                  width="350"
                  height="250"
                />
                <Text as="p" className="font-bold txt-lg">
                  Drop the file here...
                </Text>
              </>
            ) : (
              <>
                <Image
                  src="/assets/fileUpload.svg"
                  alt="File Upload"
                  width="350"
                  height="250"
                />
                <Text as="p" className="font-bold txt-lg">
                  Drag & drop a file here, or click to select a file
                </Text>
              </>
            )}
          </div>
        </Flex>
      ) : (
        <Flex direction="column" gap="5" className="w-2/3 mx-auto">
          {/* Uploading Progress */}
          <Heading as="h2" size="6" weight="medium">
            UPLOADING-
          </Heading>
          <Box>
            <Progress
              value={uploadProgress}
              size={"3"}
              variant="surface"
              style={{
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "var(--secondary-color)",
              }}
            />
            <Text as="p" align="center">
              {uploadProgress < 100 ? "Uploading..." : "File Uploaded."}
            </Text>
          </Box>

          {uploadProgress === 100 && (
            <>
              <Heading as="h2" size="6" weight="medium">
                VIDEO GENERATION STEPS -
              </Heading>
              <Box>
                <Progress
                  value={videoProgress}
                  size={"3"}
                  variant="surface"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    backgroundColor: "var(--secondary-color)",
                  }}
                />
                <Text as="p" align="center">
                  {videoStatus}
                </Text>
              </Box>
            </>
          )}
          {videoProgress === 100 && (
            <>
              <Heading as="h2" size="6" weight="medium">
                VIEW CTA - Your video has been generated.
              </Heading>
              <Button size="4" className="!text-2xl !py-4 !px-8 !bg-secondary">
                <Link href={`/app/gallery/${videoResponse?.id ?? ""}`}>
                  View here.
                </Link>
              </Button>
            </>
          )}
        </Flex>
      )}
    </Page>
  );
};

export default UploadPage;
