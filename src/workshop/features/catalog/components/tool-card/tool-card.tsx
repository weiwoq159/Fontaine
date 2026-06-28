import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import { useNavigate } from "react-router";

import type { ToolManifest } from "@core/domain";
import { Icon } from "@core/ui/Icon";

import {
  getQueueLabel,
  getStatusLabel,
  getToolCategoryMeta,
  statusColorMap,
} from "../../../../shared/tool-meta";
import styles from "./tool-card.module.scss";

interface ToolCardProps {
  tool: ToolManifest;
}

export function ToolCard({ tool }: ToolCardProps) {
  const navigate = useNavigate();
  const category = getToolCategoryMeta(tool.categoryKey);
  const isAvailable = tool.status === "available";

  const handleClickItem = () => {
    if (!isAvailable) {
      return;
    }

    navigate(tool.link);
  };

  return (
    <Card
      className={
        isAvailable
          ? styles.appCard
          : `${styles.appCard} ${styles.appCardDisabled}`
      }
      styles={{ body: { padding: 0 } }}
      style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
      variant="borderless"
      onClick={handleClickItem}
    >
      <div className={styles.appCardHead}>
        <div className={styles.appMain}>
          <span className={styles.appIcon}>
            <Icon iconKey={tool.iconKey} style={{ fontSize: 20 }} />
          </span>
          <div>
            <Typography.Title
              className={styles.appName}
              level={5}
              style={{ margin: 0 }}
            >
              {tool.name}
            </Typography.Title>
            <Typography.Text className={styles.appType} type="secondary">
              {tool.appKey}
            </Typography.Text>
          </div>
        </div>
        <span
          className={
            tool.agent?.enabled
              ? `${styles.agentSwitch} ${styles.enabled}`
              : styles.agentSwitch
          }
          title={tool.agent?.enabled ? "Agent enabled" : "Agent disabled"}
        />
      </div>

      <Typography.Paragraph className={styles.appDesc}>
        {tool.description}
      </Typography.Paragraph>

      <div className={styles.tagRow}>
        <Tag color="blue" variant="filled">
          {category.name}
        </Tag>
        <Tag color={statusColorMap[tool.status]} variant="filled">
          {getStatusLabel(tool.status)}
        </Tag>
        {tool.agent?.enabled ? (
          <Tag color="cyan" icon={<CheckCircleOutlined />} variant="filled">
            Agent
          </Tag>
        ) : null}
      </div>

      {/* <Space className={styles.tagList} size={[4, 4]} wrap>
        {tool.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space> */}

      <div className={styles.appMeta}>
        <span> {getQueueLabel(tool.queue.enabled)}</span>
        <span>{tool.entry}</span>
      </div>
    </Card>
  );
}
