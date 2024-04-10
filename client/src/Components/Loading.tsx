import React from "react";

interface LoaderProps {
  size?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "w-12",
  color = "border-black",
}) => {
  return (
    <div
      className={`w-${size} h-${size} ${color} border-solid border-b-0 rounded-full animate-spin`}
    />
  );
};

export default Loader;
