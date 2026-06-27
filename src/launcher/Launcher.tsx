import {
  LauncherHeader,
  LauncherHero,
  LauncherBackground,
  LauncherCommand,
  LauncherCard,
  LauncherTerminal,
} from "./components";
import styles from "./Launcher.module.scss";
import { launcherCards } from "./launcher.data";
import { Layout, Row, Col } from "antd";

export const Launcher = () => {
  const { Header, Content } = Layout;
  return (
    <Layout className={styles.container}>
      <LauncherBackground />
      <Header>
        <LauncherHeader />
      </Header>
      <Layout>
        <Content className={styles.content}>
          <LauncherHero />
          <LauncherCommand />
          <Row gutter={30}>
            {launcherCards.map((launcherCard) => {
              return (
                <Col span={12} key={launcherCard.productKey}>
                  <LauncherCard launcherCard={launcherCard} />
                </Col>
              );
            })}
          </Row>
          <LauncherTerminal />
        </Content>
      </Layout>
    </Layout>
  );
};
