import { ArrowLeftOutlined, SearchOutlined, ThunderboltTwoTone } from "@ant-design/icons";
import { Badge, Button, Flex, Input, Layout, Space } from "antd";
import { useNavigate } from "react-router";

import { getProductMeta } from "@core/app-meta";
import { ROUTE_PATHS } from "@workshop/layout/workshop-nav.data";

import styles from "./top-bar.module.scss";

const { Header } = Layout;

const meta = getProductMeta("workshop");

export function TopBar() {
  const navigate = useNavigate();

  const handleBackToLauncher = () => {
    navigate(ROUTE_PATHS.LAUNCHER);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>F</div>
        <Flex>
          <span className={styles.brandTitle}>{meta.displayName}</span>
          <span className={styles.romanName}>{meta.romanName}</span>
        </Flex>
      </div>

      <div className={styles.commandBar}>
        <Input
          variant="borderless"
          prefix={<SearchOutlined />}
          placeholder="搜索应用、扩展、任务，或输入 / 打开命令面板..."
          className={styles.commandInput}
        />
        <kbd className={styles.shortcut}>Ctrl K</kbd>
      </div>

      <Space className={styles.actions} size={10}>
        <Button
          aria-label="Back to launcher"
          icon={<ArrowLeftOutlined />}
          className={styles.backButton}
          onClick={handleBackToLauncher}
        >
          返回
        </Button>
        <Button className={styles.statusButton}>
          <Badge status="success" />
          Agent Ready
        </Button>
        <Button className={styles.statusButton}>Safe Runner</Button>
        <Button
          aria-label="Open agent"
          icon={<ThunderboltTwoTone />}
          className={styles.askButton}
          onClick={() => navigate(ROUTE_PATHS.AGENT)}
        >
          Ask Agent
        </Button>
      </Space>
    </Header>
  );
}
