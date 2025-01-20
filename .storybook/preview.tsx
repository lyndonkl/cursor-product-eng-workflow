import type { Preview } from "@storybook/react"
import '../src/app/globals.css'
import { initialize as initMsw } from 'msw-storybook-addon'

// Initialize MSW
initMsw({
  serviceWorker: {
    url: '/mockServiceWorker.js'
  }
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: []
    }
  }
}

export default preview 