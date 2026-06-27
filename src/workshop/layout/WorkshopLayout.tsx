import { Layout } from "antd";
import { TopBar, SideNav } from "./components";
import { Outlet } from "react-router";

import styles from "./WorkshopLayout.module.scss";

const { Content } = Layout;

export function WorkshopLayout() {
  return (
    <Layout className={styles.layout}>
      <TopBar />
      <Layout>
        <SideNav />

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
