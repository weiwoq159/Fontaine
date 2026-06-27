import { Button, Card, Tag, Typography } from "antd";
import { useNavigate } from "react-router";

import type { HeroSummaryItem } from "@workshop/features/home/home.types";
import type { DashboardOverviewStats } from "@core/domain";
import {
  heroSummaryStatusColorMap,
  heroSummaryStatusLabelMap,
} from "@workshop/features/home/home.data";

import styles from "./home-hero.module.scss";

// ─── 子组件 ───────────────────────────────────────────────────────────────────
interface SummaryCardProps {
  item: HeroSummaryItem;
}
const cardBodyStyles = {
  body: {
    padding: 0,
  },
};

const StatCard = ({ item }: SummaryCardProps) => (
  <Card className={styles.statCard} styles={cardBodyStyles} variant="borderless">
    <div className={styles.statMeta}>
      <span className={styles.statLabel}>{item.label}</span>
      <Tag
        className={styles.statBadge}
        color={heroSummaryStatusColorMap[item.status]}
        variant="filled"
      >
        {heroSummaryStatusLabelMap[item.status]}
      </Tag>
    </div>
    <span className={styles.statValue}>{item.value}</span>
  </Card>
);

// ─── 数据构造（移出组件，避免每次渲染重新分配）────────────────────────────────
const buildStatItems = (stats: DashboardOverviewStats): HeroSummaryItem[] => [
  { label: "Agent 可调用工具", value: stats.agentToolCount, status: "ready" },
  { label: "待确认计划", value: stats.pendingPlanCount, status: "review" },
  { label: "今日自动执行", value: stats.todayAutomationCount, status: "active" },
];

// ─── 主组件 ───────────────────────────────────────────────────────────────────
interface DashboardHeroProps {
  stats: DashboardOverviewStats;
}

export const HomeHero = ({ stats }: DashboardHeroProps) => {
  const navigate = useNavigate();
  const handleCatalogOpen = () => navigate("/workshop/catalog");
  const statItems = useMemo(() => buildStatItems(stats), [stats]);

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        {/* 左侧：文案 + 行动入口 */}
        <div className={styles.copy}>
          <div className={styles.copyText}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} />
              AGENTIC APP DASHBOARD
            </div>

            <h1 className={styles.headline}>应用集合，由 Fontaine 调度</h1>

            <Typography.Paragraph className={styles.description}>
              这是一个本地优先的现代桌面客户端：中间负责应用、插件、任务与运行状态总览，右侧 Agent
              副驾驶负责理解自然语言、选择工具、生成计划，并在危险操作前等待确认。
            </Typography.Paragraph>
          </div>

          <Button
            onClick={handleCatalogOpen}
            type="primary"
            className={`${styles.ctaButton} primaryButton`}
          >
            打开应用库
          </Button>
        </div>

        {/* 右侧：统计数据 */}
        <div className={styles.stats}>
          {statItems.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
