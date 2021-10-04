import React from 'react';
import { ChakraProvider, ChakraCustomTheme } from '@chakra-ui/react';

export const decorators = [
  (Story) => (
    <div id="storybook">
      <ChakraProvider theme={ChakraCustomTheme}>
        <Story />
      </ChakraProvider>
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
