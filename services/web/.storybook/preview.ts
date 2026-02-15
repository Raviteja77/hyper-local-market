import type { Preview } from "@storybook/react";
import * as NextImage from "next/image";
import "../src/app/globals.css";
import theme from "./theme";

// Mock Next.js Image component for Storybook
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props: any) => {
    // Use unoptimized images in Storybook
    return <OriginalNextImage {...props} unoptimized />;
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
        theme: theme,
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
