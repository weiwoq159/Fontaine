import { BorderBeam, Button, Col, Row, Typography } from "antd";

import { Icon } from "@core/ui/Icon";
import { useToolStore } from "@workshop/shared/stores/tool-store";
import { getToolCategoryMeta } from "@workshop/shared/tool-meta";

import styles from "./category-strip.module.scss";

export function CategoryStrip() {
  const categoryCounts = useToolStore((state) => state.categoryCounts);
  const setSelectedCategory = useToolStore((state) => state.setSelectedCategory);

  return (
    <Row className={styles.categoryStrip} gutter={[12, 12]}>
      {Object.entries(categoryCounts).map(([categoryKey, count]) => {
        const category = getToolCategoryMeta(categoryKey);

        return (
          <Col key={categoryKey} xs={24} sm={12} lg={6}>
            <BorderBeam>
              <Button
                block
                className={styles.categoryCard}
                style={{ height: "auto", padding: 0, textAlign: "left" }}
                type="text"
                onClick={() => setSelectedCategory(categoryKey)}
              >
                <div className={styles.categoryCardInner}>
                  <div className={styles.categoryTop}>
                    <span className={styles.categoryIcon}>
                      <Icon iconKey={category.iconKey} />
                    </span>
                    <Typography.Text className={styles.categoryNum} strong>
                      {count}
                    </Typography.Text>
                  </div>

                  <Typography.Text className={styles.categoryName}>{category.name}</Typography.Text>
                  <Typography.Paragraph className={styles.categoryDesc}>{category.description}</Typography.Paragraph>
                </div>
              </Button>
            </BorderBeam>
          </Col>
        );
      })}
    </Row>
  );
}
