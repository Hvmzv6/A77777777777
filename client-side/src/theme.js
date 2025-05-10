export const tokensDark = {
  grey: {
    100: "#d4d5d5",
    200: "#a9abab",
    300: "#7f8081",
    400: "#545657",
    500: "#292c2d",
    600: "#252627",
    700: "#191a1b",
    800: "#101212",
    900: "#080909",
  },

  black: {
    100: "#cfd0d0",
    200: "#a0a0a1",
    300: "#707172",
    400: "#414143",
    500: "#111214",
    600: "#0e0e10",
    700: "#0a0b0c",
    800: "#070708",
    900: "#030404",
  },
  primary: {
    100: "#d3e7fb",
    200: "#a7cff6",
    300: "#7cb7f2",
    400: "#509fed",
    500: "#2487e9",
    600: "#1d6cba",
    700: "#16518c",
    800: "#0e365d",
    900: "#071b2f",
  },

  secondary: {
    100: "#ffecb3", // light yellow accent
    200: "#ffe082",
    300: "#ffd54f",
    400: "#ffca28",
    500: "#ffc107", // secondary action color
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
  },
  indigo: {
    100: "#dadde1",
    200: "#b5bcc3",
    300: "#8f9aa5",
    400: "#6a7987",
    500: "#455769",
    600: "#374654",
    700: "#29343f",
    800: "#1c232a",
    900: "#0e1115",
  },
  red: {
    500: "#f44336", // error color
  },
};

export const tokensLight = {
  white: {
    100: "#fefefe",
    200: "#fdfdfd",
    300: "#fbfbfb",
    400: "#fafafa",
    500: "#f9f9f9",
    600: "#c7c7c7",
    700: "#959595",
    800: "#646464",
    900: "#323232",
  },
  grey: {
    100: "#fdfdfd",
    200: "#fafafa",
    300: "#f8f8f8",
    400: "#f5f5f5",
    500: "#f3f3f3",
    600: "#c2c2c2",
    700: "#929292",
    800: "#616161",
    900: "#313131",
  },
  black: {
    100: "#101010",
    200: "#1a1a1a",
    300: "#242424",
    400: "#2e2e2e",
    500: "#393939",
    600: "#5a5a5a",
    700: "#7c7c7c",
    800: "#a0a0a0",
    900: "#cfcfcf",
  },

  primary: {
    100: "#e3f2fd", // Very light blue
    200: "#bbdefb",
    300: "#90caf9",
    400: "#64b5f6",
    500: "#2196f3", // Primary button / link
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
  },

  secondary: {
    100: "#fff8e1",
    200: "#ffecb3",
    300: "#ffe082",
    400: "#ffd54f",
    500: "#ffc107", // Secondary accent
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
  },

  indigo: {
    100: "#e8eaf6",
    200: "#c5cae9",
    300: "#9fa8da",
    400: "#7986cb",
    500: "#5c6bc0",
    600: "#3f51b5", // Alternative highlight
    700: "#3949ab",
    800: "#303f9f",
    900: "#283593",
  },

  red: {
    100: "#ffebee",
    200: "#ffcdd2",
    300: "#ef9a9a",
    400: "#e57373",
    500: "#f44336", // Error
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
              contrastText: "#fff",
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
              alt: tokensDark.grey[600],
            },
            background: {
              alt: tokensDark.grey[500], // dark background
              default: tokensDark.black[500], // alternative dark background
              brighter: tokensDark.grey[600],
            },
            warning: {
              contrastText: "#fff",
              dark: "#FFC107",
              light: "#FFEB3B",
              main: "#FF9800",
            },
            success: {
              contrastText: "#fff",
              dark: "#388e3c",
              light: "#81c784",
              main: "#66bb6a",
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[500], // Balanced vibrant blue
              light: tokensLight.primary[400], // Soft background / hover
              dark: tokensLight.primary[700], // For active states
              contrastText: "#fff", // Better contrast on blue
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[500], // Golden warmth
              light: tokensLight.secondary[200],
              dark: tokensLight.secondary[700],
              contrastText: "#333333", // Good contrast on yellow/orange
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[600], // Neutral for borders / texts
              light: tokensLight.grey[300],
              dark: tokensLight.grey[700],
              contrastText: "#000000",
              alt: tokensLight.grey[0],
            },
            background: {
              default: tokensLight.white[100],
              alt: tokensLight.grey[500],
              brighter: tokensLight.grey[600],
            },
            warning: {
              contrastText: "#333333",
              dark: "#ff8f00",
              light: "#ffe082",
              main: "#ffb300", // Warm alert
            },
            success: {
              contrastText: "#ffffff",
              dark: "#2e7d32",
              light: "#a5d6a7",
              main: "#4caf50", // Friendly green
            },
            error: {
              main: tokensLight.red[500],
              light: "#ef9a9a",
              dark: "#c62828",
              contrastText: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: "bold",
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: "bold",
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: "bold",
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: "bold",
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: "bold",
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  };
};
