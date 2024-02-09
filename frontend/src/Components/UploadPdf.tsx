import React, { useCallback, useState } from "react";
import { Flex, Heading, Box, Button, Text } from "@radix-ui/themes";
import { useDropzone } from "react-dropzone";

const UploadPdf = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const files = selectedFiles.map((file: any) => (
    <li key={file?.path}>
      {file?.path} - {file.size} bytes
    </li>
  ));

  return (
    <Flex align="center" direction="column" className="mt-12">
      <Box className="flex flex-col gap-4 align-center font-secondary">
        <Heading size={"8"} align="center" className="header-primary font-thin">
          Upload Research Paper
        </Heading>
        <Heading size={"6"} align="center" className="header-primary">
          Get your Summary in a blink of an eye.
        </Heading>
      </Box>
      <Box className="flex flex-col gap-0 align-center justify-center p-4 border-2 border-dashed w-[60vw] mt-12">
        {/* DROPZONE */}
        <label
          htmlFor="fileInput"
          className="flex flex-col gap-8 h-40 cursor-pointer"
          {...getRootProps()}
        >
          <Box className="h-full w-full flex align-center justify-center">
            <input {...getInputProps()} />
            {selectedFiles.length > 0 ? (
              <Flex align={"center"} justify={"center"}>
                <ul>{files}</ul>
              </Flex>
            ) : isDragActive ? (
              <Flex align={"center"} justify={"center"}></Flex>
            ) : (
              <Flex align={"center"} justify={"center"}>
                <Text>Drag n Drop pdfs here</Text>
              </Flex>
            )}
          </Box>
        </label>
      </Box>
      <Box className="self-center flex flex-row gap-4 mt-4">
        <Button variant="classic" size={"4"} onClick={open}>
          Select from File
        </Button>

        {selectedFiles.length > 0 ? (
          <Button
            variant="classic"
            size={"4"}
            color="crimson"
            onClick={() => {
              setSelectedFiles([]);
            }}
          >
            Cancel
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
};

export default UploadPdf;
