import { Col, Row } from "antd";
import styles from "./home.module.scss";
import { HomeHero, HomeStats, AppLaunchSection } from "./components";
import type { DashboardOverviewStats, DashboardMetricStats, DashboardTool } from "./home.type";

export function HomePage() {
  const [overviewStats] = useState<DashboardOverviewStats>({
    agentToolCount: 0,
    pendingPlanCount: 0,
    todayAutomationCount: 0,
  });
  const [metricStats, setMetricStats] = useState<DashboardMetricStats>({
    installedToolCount: 0,
    todayExecutionCount: 0,
    pendingConfirmationCount: 0,
    resourceAssetCount: 0,
  });
  const [tools, setTools] = useState<DashboardTool[]>([]);

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={22} offset={1}>
          <HomeHero stats={overviewStats} />
        </Col>

        <Col span={22} offset={1}>
          <HomeStats stats={metricStats} />
        </Col>

        <Col span={13} offset={1}>
          <AppLaunchSection items={tools} />
        </Col>
      </Row>
    </div>
  );
}
