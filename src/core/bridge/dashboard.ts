import type { DashboardMetricStats, DashboardOverviewStats } from "../domain";
import { invokeApiCommand } from "./invoke";

export function getDashboardOverviewStats() {
  return invokeApiCommand<DashboardOverviewStats>("get_dashboard_overview_stats");
}

export function getDashboardMetricStats() {
  return invokeApiCommand<DashboardMetricStats>("get_dashboard_metric_stats");
}
