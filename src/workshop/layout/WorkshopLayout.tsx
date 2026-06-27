import { Layout } from "antd";
import { TopBar, SideNav } from "./components";
import { Outlet } from "react-router";
import { useToolStore } from "@workshop/shared/stores/tool-store";
import { useMount } from "ahooks";

import styles from "./WorkshopLayout.module.scss";

const { Content } = Layout;

export function WorkshopLayout() {
  const fetchTools = useToolStore((state) => state.fetchTools);

  useMount(() => {
    fetchTools();
  });

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
