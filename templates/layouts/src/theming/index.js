import React from 'react';
import { defineTokens, PentaThemeProvider, defineSemanticTokens } from '@penta-b/chakra-ui';
import { slotRecipes } from './recipes';


const themeConfig = {
  tokens: {
    colors: defineTokens.colors({
      primary: {
        "50": {
          value: "#fff7ed",
        },
        "100": {
          value: "#ffedd5",
        },
        "200": {
          value: "#fed7aa",
        },
        "300": {
          value: "#fdba74",
        },
        "400": {
          value: "#fb923c",
        },
        "500": {
          value: "#f97316",
        },
        "600": {
          value: "#ea580c",
        },
        "700": {
          value: "#92310a",
        },
        "800": {
          value: "#6c2710",
        },
        "900": {
          value: "#3b1106",
        },
        "950": {
          value: "#220a04",
        },
      },
    })
  },
  semanticTokens: {
    colors: defineSemanticTokens.colors({
      primary: {
        contrast: {
          value: {
            _light: "white",
            _dark: "black",
          },
        },
        fg: {
          value: {
            _light: "{colors.orange.700}",
            _dark: "{colors.orange.300}",
          },
        },
        subtle: {
          value: {
            _light: "{colors.orange.100}",
            _dark: "{colors.orange.900}",
          },
        },
        muted: {
          value: {
            _light: "{colors.orange.200}",
            _dark: "{colors.orange.800}",
          },
        },
        emphasized: {
          value: {
            _light: "{colors.orange.300}",
            _dark: "{colors.orange.700}",
          },
        },
        solid: {
          value: {
            _light: "{colors.orange.600}",
            _dark: "{colors.orange.500}",
          },
        },
        focusRing: {
          value: {
            _light: "{colors.orange.500}",
            _dark: "{colors.orange.500}",
          },
        },
      },
    })

  },
  slotRecipes
};


const config = {
  cssVarsPrefix: "penta",
  globalCss: {
    html: {
      lineHeight: "1.5",
      colorPalette: "primary",
    },
    body: {
      direction: document.documentElement.getAttribute('dir') === 'rtl' ? "rtl" : "ltr",
    }
  },
  theme: {
    ...themeConfig
  }
}

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  return (
    <PentaThemeProvider config={config}>
      {children}
    </PentaThemeProvider>
  );
};

export default ThemeProvider;