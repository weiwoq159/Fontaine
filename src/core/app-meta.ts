import type { IconKey } from "./ui";

export type ProductKey = "launcher" | "roleplay" | "workshop";

export interface ProductMeta {
  key: ProductKey;
  displayName: string;
  romanName: string;
  eyebrow: string;
  tagline: string;
  role: string;
  tone: ProductKey;
  routePrefix: string;
  iconKey: IconKey;
  launchable: boolean;
}

export const PRODUCTS: readonly ProductMeta[] = [
  {
    key: "launcher",
    displayName: "门厅",
    romanName: "Foyer",
    eyebrow: "Foyer",
    tagline: "选择要进入的工作空间",
    role: "launcher: product portal and global agent entry",
    tone: "launcher",
    routePrefix: "/",
    iconKey: "home",
    launchable: false,
  },
  {
    key: "roleplay",
    displayName: "欧庇克莱歌剧院",
    romanName: "Opera Epiclese",
    eyebrow: "Opera",
    tagline: "角色世界、云端对话、世界书管理",
    role: "roleplay: cloud LLM character conversation suite",
    tone: "roleplay",
    routePrefix: "/roleplay",
    iconKey: "theater",
    launchable: true,
  },
  {
    key: "workshop",
    displayName: "孤心沙龙",
    romanName: "Salon Solitaire",
    eyebrow: "Salon",
    tagline: "Python 工具、Agent 与本地自动化",
    role: "workshop: Python tools, secure runner, and agent workspace",
    tone: "workshop",
    routePrefix: "/workshop",
    iconKey: "tool",
    launchable: true,
  },
] as const;

export const productByKey = PRODUCTS.reduce(
  (acc, product) => {
    acc[product.key] = product;
    return acc;
  },
  {} as Record<ProductKey, ProductMeta>,
);

export function getProductMeta(key: ProductKey): ProductMeta {
  return productByKey[key];
}

export const SUITE_BRAND = {
  name: "Fontaine",
  sub: "Local Agent Portal",
} as const;
