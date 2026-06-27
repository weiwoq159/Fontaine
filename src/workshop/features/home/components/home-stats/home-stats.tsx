import { Card, Col, Row } from "antd";

import type { StatItem, DashboardMetricStats } from "@workshop/features/home/home.type";
import { formatResourceCount } from "@workshop/features/home/home.format";

import styles from "./home-stats.module.scss";

interface DashboardStatsProps {
  stats: DashboardMetricStats;
}

export function HomeStats({ stats }: DashboardStatsProps) {
  const statItems: StatItem[] = [
    {
      label: "已安装工具",
      value: stats.installedToolCount,
      desc: "本地工具总数",
    },
    {
      label: "今日执行",
      value: stats.todayExecutionCount,
      desc: "今日任务执行次数",
    },
    {
      label: "待确认",
      value: stats.pendingConfirmationCount,
      desc: "写入 / 覆盖 / Shell",
    },
    {
      label: "资源入库",
      value: formatResourceCount(stats.resourceAssetCount),
      desc: "图片、文档、采集结果",
    },
  ];

  return (
    <Row className={styles.miniStats} gutter={[12, 12]}>
      {statItems.map((item) => (
        <Col key={item.label} xs={24} sm={12} lg={6}>
          <Card className={styles.statCard} styles={{ body: { padding: 0 } }} variant="borderless">
            <span className={styles.statLabel}>{item.label}</span>
            <span className={styles.statValue}>{item.value}</span>
            <span className={styles.statDesc}>{item.desc}</span>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
