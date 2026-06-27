import { SettingOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Tooltip } from "antd";
import AvatarImage from "@assets/avatar.jpg";
import { SUITE_BRAND } from "@core/app-meta";
import styles from "./launcher-header.module.scss";

interface LauncherHeaderProps {
  /** 当前登录用户的名称，用于头像 fallback 及 alt 文本 */
  userName?: string;
  /** 当前登录用户的头像 URL，未传则使用默认图片 */
  userAvatarUrl?: string;
  /** 点击设置按钮的回调 */
  onSettingsClick?: () => void;
}

export function LauncherHeader({ userName, userAvatarUrl, onSettingsClick }: LauncherHeaderProps) {
  /** 头像显示优先级：动态 URL > 静态默认图 > 用户名首字母 */
  const avatarSrc = userAvatarUrl ?? AvatarImage;

  /** 用户名首字母，作为头像加载失败时的 fallback */
  const avatarFallback = userName?.[0]?.toUpperCase();

  /** 头像的无障碍描述 */
  const avatarAlt = userName ? `${userName} 的头像` : "用户头像";

  return (
    <header className={styles.container} role="banner">
      {/* 品牌区域 */}
      <Flex className={styles.brand} align="center" gap={8}>
        <Avatar className={styles.logo} shape="square" aria-label={`${SUITE_BRAND.name} 图标`}>
          F
        </Avatar>
        <Flex vertical>
          <span className={styles.brandName}>{SUITE_BRAND.name}</span>
          <span className={styles.brandSub}>{SUITE_BRAND.sub}</span>
        </Flex>
      </Flex>

      {/* 操作区域 */}
      <Flex
        className={styles.actions}
        align="center"
        gap={8}
        role="toolbar"
        aria-label="顶部操作栏"
      >
        <Tooltip title="设置" placement="bottom">
          <Button
            className={styles.settingsBtn}
            type="text"
            shape="circle"
            icon={<SettingOutlined />}
            aria-label="打开设置"
            onClick={onSettingsClick}
          />
        </Tooltip>

        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          className={styles.userAvatar}
          aria-label={avatarAlt}
        >
          {avatarFallback}
        </Avatar>
      </Flex>
    </header>
  );
}
