import { Col, Row } from "antd";

import styles from "./catalog.module.scss";
import { CatalogFilterPanel, CatalogHero, CatalogResults, CatalogStats } from "./components";

export function CatalogPage() {
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={22} offset={1}>
          <CatalogHero />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={22} offset={1}>
          <CatalogStats />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
        <Col span={4} offset={1}>
          <CatalogFilterPanel />
        </Col>
        <Col span={18}>
          <CatalogResults />
        </Col>
      </Row>
    </div>
  );
}
