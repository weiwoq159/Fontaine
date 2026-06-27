import styles from "./launcher-card.module.scss";
import { getProductMeta } from "@core/app-meta";
import type { LauncherCardIcon, LauncherCardCopy } from "@launcher/launcher.data";
import { Card, Tag, Badge, Space } from "antd";
import type { ReactNode } from "react";
import { ArrowRightOutlined, FolderOpenOutlined, ToolOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface PortalCardProps {
  launcherCard: LauncherCardCopy;
}

const iconMap: Record<LauncherCardIcon, ReactNode> = {
  archive: <FolderOpenOutlined />,
  tool: <ToolOutlined />,
};

export function LauncherCard({ launcherCard }: PortalCardProps) {
  const navigate = useNavigate();
  const product = getProductMeta(launcherCard.productKey);

  const handleClickNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <Card
      className={`${styles.card} ${styles[product.tone]}`}
      variant="borderless"
      styles={{ body: { padding: 0 } }}
      onClick={() => handleClickNavigate(product.routePrefix)}
    >
      <div className={styles.glow} />
      {launcherCard.productKey === "roleplay" ? (
        <>
          <span className={styles.decorRingLarge} />
          <span className={styles.decorRingSmall} />
        </>
      ) : (
        <div className={styles.productDiagram} />
      )}
      <div className={styles.top}>
        <span className={styles.icon}>{iconMap[launcherCard.icon]}</span>
        <Tag className={styles.badge}>
          {launcherCard.showActiveDot ? <Badge status="success" /> : null}
          {product.romanName}
        </Tag>
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{product.displayName}</h1>
          <span className={`${styles.eyebrow} ${styles[`${product.tone}Text`]}`}>
            {product.eyebrow}
          </span>
        </div>
        <span className={`${styles.subtitle} ${styles[`${product.tone}Text`]}`}>
          {product.tagline}
        </span>
        <p className={styles.description}>{launcherCard.description}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.footer}>
        <Space wrap size={[8, 8]}>
          {launcherCard.tags.map((tag) => (
            <Tag className={styles.tag} key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
        <span className={`${styles.arrow} ${styles[`${product.tone}Arrow`]}`}>
          <ArrowRightOutlined />
        </span>
      </div>
    </Card>
  );
}
