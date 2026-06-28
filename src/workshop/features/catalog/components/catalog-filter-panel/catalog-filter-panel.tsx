import { Button, Typography } from "antd";

import { statusFilters, useToolStore } from "@workshop/shared/stores/tool-store";
import { statusFilterLabels } from "@workshop/shared/tool-meta";

import shared from "../../catalog.module.scss";
import styles from "./catalog-filter-panel.module.scss";

export function CatalogFilterPanel() {
  const toolsCount = useToolStore((state) => state.tools.length);
  const categoryOptions = useToolStore((state) => state.categoryOptions);
  const categoryCounts = useToolStore((state) => state.categoryCounts);
  const statusCounts = useToolStore((state) => state.statusCounts);
  const selectedCategory = useToolStore((state) => state.selectedCategory);
  const selectedStatus = useToolStore((state) => state.selectedStatus);
  const setSelectedCategory = useToolStore((state) => state.setSelectedCategory);
  const setSelectedStatus = useToolStore((state) => state.setSelectedStatus);

  return (
    <aside className={`${shared.glassPanel} ${shared.filterPanel} ${styles.filterPanel}`}>
      <header className={shared.sectionHead}>
        <div>
          <h2 style={{ margin: 0 }}>筛选</h2>
          <Typography.Paragraph style={{ margin: 0 }}>按分类、状态与 Agent 能力定位工具。</Typography.Paragraph>
        </div>
      </header>

      <div className={styles.filterGroup}>
        <span className={styles.filterTitle}>分类</span>
        <div className={styles.filterList}>
          {categoryOptions.map((category) => (
            <Button
              block
              className={selectedCategory === category.key ? `${styles.filterItem} ${styles.active}` : styles.filterItem}
              key={category.key}
              type="text"
              onClick={() => setSelectedCategory(category.key)}
            >
              <span>{category.name}</span>
              <span>{category.key === "all" ? toolsCount : (categoryCounts[category.key] ?? 0)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterTitle}>状态</span>
        <div className={styles.filterList}>
          {statusFilters.map((status) => (
            <Button
              block
              className={selectedStatus === status ? `${styles.filterItem} ${styles.active}` : styles.filterItem}
              key={status}
              type="text"
              onClick={() => setSelectedStatus(status)}
            >
              <span>{statusFilterLabels[status]}</span>
              <span>{statusCounts[status]}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.permissionCard}>
        <span>Agent 暴露规则</span>
        <span>这里仅展示 manifest 声明结果。涉及写文件、Shell、截图等能力时，仍应在运行链路里二次确认。</span>
      </div>
    </aside>
  );
}
