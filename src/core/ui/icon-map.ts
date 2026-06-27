import type { ComponentType, CSSProperties } from "react";
import {
  AppstoreOutlined,
  BankOutlined,
  BookOutlined,
  BugOutlined,
  CodeOutlined,
  DownloadOutlined,
  EditOutlined,
  ExpandOutlined,
  FileSearchOutlined,
  GlobalOutlined,
  HistoryOutlined,
  HomeOutlined,
  KeyOutlined,
  MessageOutlined,
  PictureOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from "@ant-design/icons";

/**
 * 全仓唯一的图标 key 枚举。
 * - manifest.json 的 `iconKey`、app-meta 的产品图标、导航数据都只能引用这里的 key。
 * - 真正"长什么样"由下面的 ICON_COMPONENTS 决定，换图标库只改这一处。
 */
export type IconKey =
  // 产品 / 导航
  | "app"
  | "home"
  | "tool"
  | "theater"
  | "activity"
  | "book"
  | "chat"
  | "key"
  | "spark"
  // 工具 manifest 用到的
  | "file"
  | "rename"
  | "download"
  | "picture"
  | "resize"
  | "code"
  | "bug"
  | "global"
  | "game";

type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

/** iconKey → 真实 antd 图标组件。新增图标：先加 IconKey，再在这里登记。 */
export const ICON_COMPONENTS: Record<IconKey, IconComponent> = {
  app: AppstoreOutlined,
  home: HomeOutlined,
  tool: ToolOutlined,
  theater: BankOutlined,
  activity: HistoryOutlined,
  book: BookOutlined,
  chat: MessageOutlined,
  key: KeyOutlined,
  spark: ThunderboltOutlined,
  file: FileSearchOutlined,
  rename: EditOutlined,
  download: DownloadOutlined,
  picture: PictureOutlined,
  resize: ExpandOutlined,
  code: CodeOutlined,
  bug: BugOutlined,
  global: GlobalOutlined,
  game: ThunderboltOutlined,
};

/** 非法 / 缺失 iconKey 的兜底图标。 */
export const DEFAULT_ICON_KEY: IconKey = "app";

/**
 * 清洗：把来自 manifest（手写 json，可能写错）的任意字符串收敛成合法 IconKey。
 * 非法或为空时回落到 DEFAULT_ICON_KEY。
 */
export function resolveIconKey(raw?: string | null): IconKey {
  return raw != null && raw in ICON_COMPONENTS ? (raw as IconKey) : DEFAULT_ICON_KEY;
}
