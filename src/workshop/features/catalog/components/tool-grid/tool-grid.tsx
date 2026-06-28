import { Col, Empty, Row, Skeleton } from "antd";

import { useToolStore } from "@workshop/shared/stores/tool-store";

import { ToolCard } from "../tool-card";
import styles from "./tool-grid.module.scss";

export function ToolGrid() {
  const isLoading = useToolStore((state) => state.isLoading);
  const filteredTools = useToolStore((state) => state.filteredTools);

  if (isLoading) {
    return (
      <Row className={styles.skeletonGrid} gutter={[13, 13]}>
        {Array.from({ length: 6 }, (_, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Skeleton.Node active className={styles.skeletonCard} />
          </Col>
        ))}
      </Row>
    );
  }

  if (filteredTools.length === 0) {
    return <Empty description="没有匹配当前筛选条件的工具" />;
  }

  return (
    <Row className={styles.appGrid} gutter={[13, 13]}>
      {filteredTools.map((tool) => (
        <Col key={tool.appKey} xs={24} sm={12} lg={8}>
          <ToolCard tool={tool} />
        </Col>
      ))}
    </Row>
  );
}
