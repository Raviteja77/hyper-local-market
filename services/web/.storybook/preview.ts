import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      (Story) => {
        if (typeof process === 'undefined') {
          (window as any).process = {
            env: { NODE_ENV: 'development' }, // or 'production'
          };
        }
        return Story();
      },
    ],
    docs: {
        theme: theme,
    },
  },
};

export default preview;
