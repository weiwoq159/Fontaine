import { SearchOutlined } from "@ant-design/icons";
import { Input, Tag, Typography } from "antd";

import { useToolStore } from "@workshop/shared/stores/tool-store";

import { CategoryStrip } from "../category-strip";
import { ToolGrid } from "../tool-grid";
import shared from "../../catalog.module.scss";
import styles from "./catalog-results.module.scss";

export function CatalogResults() {
  const searchText = useToolStore((state) => state.searchText);
  const setSearchText = useToolStore((state) => state.setSearchText);
  const filteredCount = useToolStore((state) => state.filteredTools.length);
  const totalCount = useToolStore((state) => state.tools.length);

  return (
    <section className={`${shared.glassPanel} ${shared.catalogPanel} ${styles.catalogPanel}`}>
      <header className={shared.sectionHead}>
        <div>
          <Typography.Title level={2} style={{ margin: 0, marginBottom: 12 }}>
            已挂载应用
          </Typography.Title>
          <Typography.Paragraph style={{ margin: 0 }}>
            面向人的应用入口，同时也是 Agent 工具能力的来源。
          </Typography.Paragraph>
        </div>
        <Tag color="blue" variant="filled">
          {filteredCount} / {totalCount}
        </Tag>
      </header>

      <div className={styles.toolbar}>
        <Input
          allowClear
          className={styles.searchInput}
          placeholder="搜索应用名、能力描述、appKey、分类或标签"
          prefix={<SearchOutlined />}
          value={searchText}
          variant="filled"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      <CategoryStrip />
      <ToolGrid />
    </section>
  );
}
