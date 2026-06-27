import type { ThemeConfig } from "antd";

export const fontaineTheme: ThemeConfig = {
  token: {
    colorPrimary: "#DC143C",
  },
  components: {
    Layout: {
      headerPadding: 0,
      headerBg: "none",
      bodyBg: "none",
    },
  },
};
