export const theme = {
  colors: {
    // Neutral colors - Darker colors for better white text visibility
    N0: "#FFFFFF", // Pure white
    N20: "#E2E8F0", // Medium-light gray with more presence
    N30: "#64748B", // Medium-dark gray
    N400A: "rgba(30, 41, 59, 0.7)", // Much darker gray with higher opacity
    N900: "#0F172A", // Very dark slate for maximum contrast

    // Red colors - Darker reds for better white text visibility
    R75: "#DC2626", // Dark red ensuring white text is clearly visible
    R100: "#B91C1C", // Very dark red for maximum contrast with white text
  },
};

export type Theme = typeof theme;

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      N0: string;
      N20: string;
      N30: string;
      N400A: string;
      N900: string;
      R75: string;
      R100: string;
    };
  }
}
