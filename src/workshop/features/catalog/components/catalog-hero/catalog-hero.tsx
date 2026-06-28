import { Button, Typography } from "antd";

import { useToolStore } from "@workshop/shared/stores/tool-store";

import shared from "../../catalog.module.scss";
import styles from "./catalog-hero.module.scss";

export function CatalogHero() {
  const tools = useToolStore((state) => state.tools);
  const fetchTools = useToolStore((state) => state.fetchTools);
  const agentToolCount = tools.filter((item) => item.agent?.enabled).length;
  const unavailableCount = tools.filter((tool) => tool.status !== "available").length;

  return (
    <section className={`${shared.glassPanel} ${styles.hero}`}>
      <div className={styles.heroBody}>
        <div>
          <span className={styles.kicker}>Workshop App Library</span>
          <h1 className={styles.title} style={{ margin: 0, marginBottom: 12 }}>
            应用库
          </h1>
          <Typography.Paragraph className={styles.desc} style={{ margin: 0 }}>
            读取 tools 目录下的真实 manifest 数据，集中查看本地工具、运行入口、Agent 暴露状态与分类分布。
          </Typography.Paragraph>
          <Button className={`${styles.actions} primaryButton`} onClick={() => void fetchTools()}>
            刷新清单
          </Button>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.miniRow}>
            <span>已安装应用</span>
            <span>{tools.length}</span>
          </div>
          <div className={styles.miniRow}>
            <span>Agent 可调度</span>
            <span>{agentToolCount}</span>
          </div>
          <div className={styles.miniRow}>
            <span>需要处理</span>
            <span>{unavailableCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
