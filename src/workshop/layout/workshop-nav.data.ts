import type { ComponentType, CSSProperties } from "react";
import {
  AppstoreOutlined,
  CodeOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  HomeOutlined,
  PictureOutlined,
  RobotOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

export interface WorkshopNavItem {
  key: string;
  path: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  name: string;
  description: string;
}

export interface WorkshopNavSection {
  key: string;
  label: string;
  children: WorkshopNavItem[];
}

export const ROUTE_PATHS = {
  LAUNCHER: "/",
  HOME: "/workshop",
  CATALOG: "/workshop/catalog",
  RUNNER: "/workshop/runner",
  AGENT: "/workshop/agent",
  ACTIVITY: "/workshop/activity",
  FILE_PROCESSING: "/workshop/apps/file-processing",
  RESOURCE_COLLECTION: "/workshop/apps/resource-collection",
  DEV_TOOLS: "/workshop/apps/dev-tools",
  IMAGE_PROCESSING: "/workshop/apps/image-processing",
  GAME_MACRO: "/workshop/apps/game-macro",
} as const;

export const workshopNavSections: WorkshopNavSection[] = [
  {
    key: "core",
    label: "核心",
    children: [
      {
        key: "home",
        path: ROUTE_PATHS.HOME,
        icon: HomeOutlined,
        name: "首页",
        description: "总览、状态与 Agent 计划",
      },
      {
        key: "catalog",
        path: ROUTE_PATHS.CATALOG,
        icon: AppstoreOutlined,
        name: "应用库",
        description: "工具清单与分类检索",
      },
      {
        key: "agent",
        path: ROUTE_PATHS.AGENT,
        icon: RobotOutlined,
        name: "Agent",
        description: "对话、工具调用、计划确认",
      },
      {
        key: "activity",
        path: ROUTE_PATHS.ACTIVITY,
        icon: HistoryOutlined,
        name: "活动",
        description: "队列、运行中、历史结果",
      },
    ],
  },
  {
    key: "app-categories",
    label: "应用分类",
    children: [
      {
        key: "file-processing",
        path: ROUTE_PATHS.FILE_PROCESSING,
        icon: FolderOpenOutlined,
        name: "文件处理",
        description: "扫描、重命名、解析、归档",
      },
      {
        key: "resource-collection",
        path: ROUTE_PATHS.RESOURCE_COLLECTION,
        icon: FileSearchOutlined,
        name: "资源采集",
        description: "网页、图片、素材下载",
      },
      {
        key: "dev-tools",
        path: ROUTE_PATHS.DEV_TOOLS,
        icon: CodeOutlined,
        name: "开发调试",
        description: "JSON、接口、环境、脚本控制台",
      },
      {
        key: "image-processing",
        path: ROUTE_PATHS.IMAGE_PROCESSING,
        icon: PictureOutlined,
        name: "图像处理",
        description: "识别、去重、批量导出",
      },
      {
        key: "game-macro",
        path: ROUTE_PATHS.GAME_MACRO,
        icon: ThunderboltOutlined,
        name: "游戏宏",
        description: "按键宏、连点、脚本、自动化",
      },
    ],
  },
];

export const workshopNavItems = workshopNavSections.flatMap((section) => section.children);
