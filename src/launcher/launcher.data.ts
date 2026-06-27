import type { ProductKey } from "@core/app-meta";

export type LauncherCardIcon = "archive" | "tool";

export interface LauncherCardCopy {
  productKey: ProductKey;
  summary: string;
  tags: string[];
  icon: LauncherCardIcon;
  description: string;
  showActiveDot?: boolean;
}
export const launcherCards: LauncherCardCopy[] = [
  {
    productKey: "roleplay",
    summary: "管理角色卡、世界书、预设与云端模型连接。",
    tags: ["Character cards", "World book", "Cloud LLM"],
    icon: "archive",
    description:
      "沉浸式角色扮演工作区。在这里管理世界设定、角色卡、预设、剧情上下文，并通过云端模型进行对话。",
  },
  {
    productKey: "workshop",
    summary: "从工具目录启动 Python 任务，并把能力交给 Agent。",
    tags: ["Tool catalog", "Runner", "Agent"],
    icon: "tool",
    description:
      "系统级自动化工具工作区。管理工具目录、Python 任务、执行器与 Agent 能力，并将本地能力安全暴露给应用。",
    showActiveDot: true,
  },
];

export const agentTerminalCopy = {
  title: "Agent Terminal",
  prefix: "[System]",
  message: "Agent Core ready. Roleplay and Workshop portals mounted. Waiting for command...",
  chips: ["LLM", "Tools", "Guard"],
};
