import { brand } from "src/brands";

export const getEnv = (key: keyof ImportMetaEnv, defaultValue: string): string  => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value = import.meta.env[key];
  return typeof value === "string" ? value : defaultValue;
};

export type Theme = {
  breakpoints: {
    downLg: string;
    downM: string;
    upSm: string;
  };
  fontFamily: string;
  hoverTransition: string;
  maxWidth: number;
  palette: {
    black: string;
    error: {
      light: string;
      main: string;
    };
    grey: {
      dark: string;
      light: string;
      main: string;
      veryDark: string;
    };
    primary: {
      dark: string;
      light: string;
      main: string;
      mainRedesign: string;
    };
    success: {
      light: string;
      main: string;
    };
    transparency: string;
    warning: {
      light: string;
      main: string;
    };
    white: string;
  };
  spacing: (value: number) => number;
};

// Palette defaults come from the active brand (src/brands). Individual
// `VITE_THEME_COLOR_*` env vars still override them, preserving prior behaviour.
export const theme: Theme = {
  breakpoints: {
    downLg: "@media (max-width: 1024px)",
    downM: "@media (max-width: 788px)",
    upSm: "@media (min-width: 480px)",
  },
  fontFamily: brand.fontFamily,
  hoverTransition: "all 150ms",
  maxWidth: 644,
  palette: {
    black: getEnv("VITE_THEME_COLOR_BLACK", brand.palette.black),
    error: {
      light: getEnv("VITE_THEME_COLOR_ERROR_LIGHT", brand.palette.error.light),
      main: getEnv("VITE_THEME_COLOR_ERROR_MAIN", brand.palette.error.main),
    },
    grey: {
      dark: getEnv("VITE_THEME_COLOR_GREY_DARK", brand.palette.grey.dark),
      light: getEnv("VITE_THEME_COLOR_GREY_LIGHT", brand.palette.grey.light),
      main: getEnv("VITE_THEME_COLOR_GREY_MAIN", brand.palette.grey.main),
      veryDark: getEnv("VITE_THEME_COLOR_GREY_VERY_DARK", brand.palette.grey.veryDark),
    },
    primary: {
      dark: getEnv("VITE_THEME_COLOR_PRIMARY_DARK", brand.palette.primary.dark),
      light: getEnv("VITE_THEME_COLOR_PRIMARY_LIGHT", brand.palette.primary.light),
      main: getEnv("VITE_THEME_COLOR_PRIMARY_MAIN", brand.palette.primary.main),
      mainRedesign: getEnv(
        "VITE_THEME_COLOR_PRIMARY_MAIN_REDESIGN",
        brand.palette.primary.mainRedesign
      ),
    },
    success: {
      light: getEnv("VITE_THEME_COLOR_SUCCESS_LIGHT", brand.palette.success.light),
      main: getEnv("VITE_THEME_COLOR_SUCCESS_MAIN", brand.palette.success.main),
    },
    transparency: getEnv("VITE_THEME_COLOR_TRANSPARENCY", brand.palette.transparency),
    warning: {
      light: getEnv("VITE_THEME_COLOR_WARNING_LIGHT", brand.palette.warning.light),
      main: getEnv("VITE_THEME_COLOR_WARNING_MAIN", brand.palette.warning.main),
    },
    white: getEnv("VITE_THEME_COLOR_WHITE", brand.palette.white),
  },
  spacing: (value: number): number => value * 8,
};
