import { Button, Card, Col, Row, Typography } from "antd";

import { Icon } from "@core/ui/Icon";
import type { DashboardTool } from "../../home.types";
import styles from "./app-launch-section.module.scss";

interface AppLaunchSectionProps {
  items: DashboardTool[];
}

export function AppLaunchSection({ items }: AppLaunchSectionProps) {
  const handleSectionActionClick = () => {};

  return (
    <Card className={styles.sectionCard} styles={{ body: { padding: 0 } }} variant="borderless">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.sectionTitle} level={2} style={{ margin: 0 }}>
            应用启动区
          </span>
          <Typography.Paragraph className={styles.sectionDesc} style={{ margin: 0 }}>
            常用应用、Agent 可调用工具和本地插件统一放在这里。
          </Typography.Paragraph>
        </div>

        <Button type="text" className={styles.text_button} onClick={handleSectionActionClick}>
          管理应用
        </Button>
      </div>

      <Row className={styles.appGrid} gutter={[12, 12]}>
        {items.map((item) => {
          return (
            <Col key={item.appKey} xs={24} sm={12} lg={8}>
              <Card
                className={styles.appCard}
                styles={{ body: { padding: 0 } }}
                variant="borderless"
              >
                <div className={styles.appCard_head}>
                  <span className={styles.appIcon}>
                    <Icon iconKey={item.iconKey} />
                  </span>
                </div>

                <span className={styles.appName}>{item.name}</span>
                <Typography.Paragraph className={styles.appDesc} style={{ margin: 0 }}>
                  {item.description}
                </Typography.Paragraph>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}
