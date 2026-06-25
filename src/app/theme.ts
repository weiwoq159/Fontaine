import type { ThemeConfig } from "antd";

export const fontaineTheme: ThemeConfig = {
  token: {
    borderRadius: 8,
    colorText: "#203036",
    fontFamily: 'Aptos, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
  },
  components: {
    Button: {
      controlHeight: 40,
    },
    Card: {
      borderRadiusLG: 8,
    },
  },
};
