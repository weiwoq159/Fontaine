import { Card, Col, Row, Typography } from "antd";

import shared from "@workshop/features/catalog/catalog.module.scss";
import { useToolStore } from "@workshop/shared/stores/tool-store";
import styles from "./catalog-stats.module.scss";

export function CatalogStats() {
  const stats = useToolStore((state) => state.stats);

  return (
    <Row className={styles.statsGrid} gutter={[12, 12]}>
      {stats.map((stat) => (
        <Col key={stat.label} xs={24} sm={12} lg={6}>
          <Card
            className={`${shared.glassPanel} ${styles.statCard}`}
            styles={{ body: { padding: 0 } }}
            variant="borderless"
          >
            <Typography.Text type="secondary">{stat.label}</Typography.Text>
            <Typography.Text strong>{stat.value}</Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }}>{stat.desc}</Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
