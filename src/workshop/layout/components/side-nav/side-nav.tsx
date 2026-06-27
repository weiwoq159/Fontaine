import type { MenuProps } from "antd";
import { Badge, Card, Flex, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router";

import { getProductMeta } from "@core/app-meta";
import {
  ROUTE_PATHS,
  workshopNavItems,
  workshopNavSections,
} from "@workshop/layout/workshop-nav.data";

import styles from "./side-nav.module.scss";

const { Sider } = Layout;

const meta = getProductMeta("workshop");

const menuItems: MenuProps["items"] = workshopNavSections.map((section) => ({
  key: section.key,
  type: "group",
  label: section.label,
  children: section.children.map((item) => {
    const Icon = item.icon;

    return {
      key: item.key,
      icon: (
        <span className={styles.navIcon}>
          <Icon />
        </span>
      ),
      label: (
        <span className={styles.navLabel}>
          <span className={styles.navName}>{item.name}</span>
          <span className={styles.navDesc}>{item.description}</span>
        </span>
      ),
    };
  }),
}));

function getSelectedNavKey(pathname: string) {
  const exactMatch = workshopNavItems.find((item) => item.path === pathname);

  if (exactMatch) {
    return exactMatch.key;
  }

  // 最长前缀匹配（排除 HOME，否则它会吃掉所有 /workshop/* 子路径）
  const prefixMatch = workshopNavItems
    .filter((item) => item.path !== ROUTE_PATHS.HOME && pathname.startsWith(`${item.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0];

  return prefixMatch?.key ?? "home";
}

export function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = getSelectedNavKey(location.pathname);

  return (
    <Sider width={266} className={styles.sider} theme="light">
      <Flex vertical={true} justify="space-between" style={{ height: "100%" }}>
        <div>
          <div className={styles.title}>
            <span className={styles.titleMain}>{meta.displayName}</span>
            <span className={styles.titleSub}>{meta.romanName}</span>
          </div>

          <div className={styles.menuScroll}>
            <Menu
              className={styles.menu}
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={({ key }) => {
                const target = workshopNavItems.find((item) => item.key === key);

                if (target) {
                  navigate(target.path);
                }
              }}
            />
          </div>
        </div>

        <Card className={styles.statusCard} variant="borderless">
          <div className={styles.statusHead}>
            <span className={styles.statusTitle}>本地运行状态</span>
            <Badge status="success" />
          </div>

          <div className={styles.runtimeList}>
            <RuntimeRow name="Tauri Bridge" status="Online" />
            <RuntimeRow name="Python Runtime" status="Ready" />
            <RuntimeRow name="Command Guard" status="Strict" />
          </div>
        </Card>
      </Flex>
    </Sider>
  );
}

function RuntimeRow({ name, status }: { name: string; status: string }) {
  return (
    <div className={styles.runtimeRow}>
      <span>{name}</span>
      <span>{status}</span>
    </div>
  );
}
