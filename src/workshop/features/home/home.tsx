// React core
import { useMemo, useState } from "react";

// External libraries
import { Col, Row } from "antd";
import { useMount } from "ahooks";

// Internal - domain types
import type { DashboardMetricStats, DashboardOverviewStats } from "@core/domain";

// Internal - bridge/API
import { getDashboardMetricStats, getDashboardOverviewStats } from "@core/bridge/dashboard";

// Internal - stores
import { useToolStore } from "@workshop/shared/stores/tool-store";

// Internal - components & styles
import { AppLaunchSection, HomeHero, HomeStats } from "./components";
import styles from "./home.module.scss";

/** 概览统计的默认初始值，防止首次渲染出现 undefined */
const DEFAULT_OVERVIEW_STATS: DashboardOverviewStats = {
  agentToolCount: 0,
  pendingPlanCount: 0,
  todayAutomationCount: 0,
};

/** 指标统计的默认初始值，防止首次渲染出现 undefined */
const DEFAULT_METRIC_STATS: DashboardMetricStats = {
  installedToolCount: 0,
  todayExecutionCount: 0,
  pendingConfirmationCount: 0,
  resourceAssetCount: 0,
};

/** 首页最多展示的快速启动工具数量 */
const MAX_LAUNCH_TOOLS = 6;

export function HomePage() {
  const [overviewStats, setOverviewStats] = useState<DashboardOverviewStats>(DEFAULT_OVERVIEW_STATS);
  const [metricStats, setMetricStats] = useState<DashboardMetricStats>(DEFAULT_METRIC_STATS);

  // 从全局 store 获取工具列表
  const tools = useToolStore((state) => state.tools);

  // 首页启动区只展示前 MAX_LAUNCH_TOOLS 个工具，避免每次 render 重新 slice
  const launchTools = useMemo(() => tools.slice(0, MAX_LAUNCH_TOOLS), [tools]);

  /**
   * 并发加载首页所需的概览统计和指标统计
   * 使用 Promise.all 减少串行请求带来的等待时间
   */
  const loadDashboardDetail = async () => {
    try {
      const [overview, metrics] = await Promise.all([getDashboardOverviewStats(), getDashboardMetricStats()]);
      setOverviewStats(overview);
      setMetricStats(metrics);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  };

  // 组件挂载后立即拉取数据，仅执行一次
  useMount(() => {
    void loadDashboardDetail();
  });

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {/* Hero 区：展示概览统计（任务数、自动化数等） */}
        <Col span={22} offset={1}>
          <HomeHero stats={overviewStats} />
        </Col>

        {/* 指标卡片区：展示已安装工具数、今日执行数等 */}
        <Col span={22} offset={1}>
          <HomeStats stats={metricStats} />
        </Col>

        {/* 快速启动区：展示前 MAX_LAUNCH_TOOLS 个常用工具入口 */}
        <Col span={13} offset={1}>
          <AppLaunchSection items={launchTools} />
        </Col>
      </Row>
    </div>
  );
}
