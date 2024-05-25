import { Section } from "@radix-ui/themes";
import React, { CSSProperties } from "react";

type PageProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Page: React.FC<PageProps> = ({ children, className, style }) => {
  return (
    <Section
      className={className}
      style={{
        ...style,
        minHeight: "calc(100vh - 6rem)",
        backgroundColor: "var(--background-color)",
      }}
    >
      {children}
    </Section>
  );
};

export default Page;
