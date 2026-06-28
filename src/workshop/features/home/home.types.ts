import type { ToolManifest } from "@core/domain";

export type HeroSummaryStatus = "ready" | "review" | "active";

export interface HeroSummaryItem {
  label: string;
  value: number | string;
  status: HeroSummaryStatus;
}

export type DashboardTool = Pick<ToolManifest, "appKey" | "name" | "description" | "status" | "iconKey">;
