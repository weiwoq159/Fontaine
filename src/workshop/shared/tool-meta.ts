import type { ToolManifest } from "@core/domain";

export type ToolCategoryKey =
  | "all"
  | "file-processing"
  | "resource-collection"
  | "dev-debug"
  | "dev-tools"
  | "image-processing"
  | "game-macro"
  | string;

export type ToolStatusFilter = "all" | ToolManifest["status"] | "agent-enabled";

export interface ToolCategoryMeta {
  key: ToolCategoryKey;
  name: string;
  description: string;
  iconKey: string;
}

export const toolCategoryMetaMap: Record<string, ToolCategoryMeta> = {
  all: {
    key: "all",
    name: "全部应用",
    description: "来自 tools 目录的全部 manifest",
    iconKey: "app",
  },
  "file-processing": {
    key: "file-processing",
    name: "文件处理",
    description: "扫描、重命名、解析、归档类工具",
    iconKey: "file",
  },
  "resource-collection": {
    key: "resource-collection",
    name: "资源采集",
    description: "网页、图片和素材采集类工具",
    iconKey: "download",
  },
  "dev-debug": {
    key: "dev-debug",
    name: "开发调试",
    description: "JSON、正则、接口和本地调试工具",
    iconKey: "code",
  },
  "dev-tools": {
    key: "dev-tools",
    name: "开发调试",
    description: "JSON、接口、环境和脚本控制台工具",
    iconKey: "code",
  },
  "image-processing": {
    key: "image-processing",
    name: "图像处理",
    description: "压缩、转码、尺寸调整和批量导出",
    iconKey: "picture",
  },
  "game-macro": {
    key: "game-macro",
    name: "游戏宏",
    description: "按键宏、连点、脚本与游戏自动化辅助",
    iconKey: "game",
  },
};

export const statusFilterLabels: Record<ToolStatusFilter, string> = {
  all: "全部状态",
  available: "可用",
  disabled: "禁用",
  hidden: "隐藏",
  "agent-enabled": "Agent 可调度",
};

export const statusColorMap: Record<string, string> = {
  available: "green",
  disabled: "default",
  hidden: "blue",
};

export const queueLabelMap: Record<"true" | "false", string> = {
  true: "队列",
  false: "立即",
};

export function getToolCategoryMeta(categoryKey: string): ToolCategoryMeta {
  return (
    toolCategoryMetaMap[categoryKey] ?? {
      key: categoryKey,
      name: categoryKey,
      description: "manifest 中声明的自定义分类",
      iconKey: "app",
    }
  );
}

export function getQueueLabel(enabled: boolean) {
  return queueLabelMap[enabled ? "true" : "false"];
}

export function getStatusLabel(status: ToolManifest["status"]) {
  return statusFilterLabels[status] ?? status;
}

export interface ToolCategoryMeta {
  key: ToolCategoryKey;
  name: string;
  description: string;
  iconKey: string;
}
