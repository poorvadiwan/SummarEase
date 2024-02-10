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
    <li key={file?.path} className="font-bold text-xl">
      {file?.path}
    </li>
  ));

  return (
    <Flex align="center" direction="column" className="mt-8 px-4">
      <Box className="flex flex-col gap-4 align-center font-secondary">
        <Heading
          size={"9"}
          align="center"
          weight={"regular"}
          className="header-primary"
        >
          Upload Your File
        </Heading>
        <Heading
          size={"6"}
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
        <Button variant="solid" size={"4"} onClick={open}>
          Select from File
        </Button>

        {selectedFiles.length > 0 ? (
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
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
};

export default UploadPdf;
