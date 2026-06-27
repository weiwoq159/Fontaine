import type { ToolManifest } from "@core/domain";

export interface DashboardOverviewStats {
  agentToolCount: number;
  pendingPlanCount: number;
  todayAutomationCount: number;
}

export interface DashboardMetricStats {
  installedToolCount: number;
  todayExecutionCount: number;
  pendingConfirmationCount: number;
  resourceAssetCount: number;
}

export type HeroSummaryStatus = "ready" | "review" | "active";

export interface HeroSummaryItem {
  label: string;
  value: number | string;
  status: HeroSummaryStatus;
}

export type DashboardTool = Pick<
  ToolManifest,
  "appKey" | "name" | "description" | "status" | "iconKey"
>;

export interface StatItem {
  label: string;
  value: number | string;
  desc: string;
}
