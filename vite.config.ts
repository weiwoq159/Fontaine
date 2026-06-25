import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";

const resolvePath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        "react",
        "react-router-dom",
        {
          ahooks: [
            "useRequest",
            "useMount",
            "useUnmount",
            "useUpdateEffect",
            "useDebounce",
            "useDebounceFn",
            "useThrottle",
            "useThrottleFn",
            "useBoolean",
            "useToggle",
            "useSetState",
            "useLocalStorageState",
            "useSessionStorageState",
            "useMemoizedFn",
            "useCreation",
            "useReactive",
            "useSafeState",
            "useInterval",
            "useTimeout",
            "useEventListener",
            "useClickAway",
            "useSize",
            "useFullscreen",
            "usePagination",
          ],
        },
      ],
      dts: "src/auto-imports.d.ts",
      viteOptimizeDeps: true,
      eslintrc: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@core": resolvePath("./src/core"),
      "@launcher": resolvePath("./src/launcher"),
      "@workshop": resolvePath("./src/workshop"),
    },
  },
});
