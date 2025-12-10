import { defineSlotRecipe } from "@penta-b/chakra-ui"


export const pluginContainerRecipe = defineSlotRecipe({
  base: {
    root: {
      display: "flex"
    }
  },
  variants: {
    variant: {
      mapOverlay: {
        root: {
          display: "flex",
          flexDirection: "column",
          height: "fit",
          w: "md",
          padding: 4,
          gap: 2,
          borderRadius: "md",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"
        },
        body: {
          flex: "1",
          overflow: "auto",
          position: "relative",

        },
        footer: {
          "& [data-scope='penta-action-button']": {
            "& [data-scope='penta-action-button-text']": {
              display: "none"
            }
          }
        }
      },
      dialogs: {
        body: {
          display: "flex",
          flexDir: "column",
          gap: "2",
          w: "full",
        },
        footer: {
          w: "full",
          gap: 2,
          "& button": {
            flex: 1
          }
        }
      }
    },
    minimized: {
      true: {
        body: {
          h: "0",
          flex: "unset",
          overflow: "hidden"
        },
        header: {
          h: "0",
          overflow: "hidden"
        },
        footer: {
          h: "0",
          overflow: "hidden"
        }

      }
    }
  },
  defaultVariants: {
    variant: 'panel',
  },
});

