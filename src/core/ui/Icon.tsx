import type { CSSProperties } from "react";

import { ICON_COMPONENTS, resolveIconKey } from "./icon-map";

interface IconProps {
  /** 来自 manifest / app-meta 的图标 key；非法值会被清洗为兜底图标。 */
  iconKey?: string | null;
  className?: string;
  style?: CSSProperties;
}

/** 全仓统一的图标渲染入口：传 iconKey，内部清洗 + 映射到真实 antd 图标。 */
export function Icon({ iconKey, className, style }: IconProps) {
  const Glyph = ICON_COMPONENTS[resolveIconKey(iconKey)];
  return <Glyph className={className} style={style} />;
}
