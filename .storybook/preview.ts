import type { Preview } from "@storybook/react";
import '../src/app/globals.css'
import '../src/styles/components/timeline-chart.css'
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--background)' },
        { name: 'dark', value: 'var(--background-dark)' },
      ],
    },
  },
  loaders: [mswLoader],
};

export default preview;
