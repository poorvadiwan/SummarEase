import React from "react";

interface LoaderProps {
  size?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "50px",
  color = "#000000",
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}`,
        borderTop: `3px solid transparent`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default Loader;
