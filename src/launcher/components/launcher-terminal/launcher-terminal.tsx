import { Tag } from "antd";

import { agentTerminalCopy } from "@launcher/launcher.data";

import styles from "./launcher-terminal.module.scss";

export function LauncherTerminal() {
  const { title, prefix, message, chips } = agentTerminalCopy;

  return (
    <section className={styles.terminal} aria-label={title}>
      <div className={styles.title}>
        <span className={styles.pulse} aria-hidden="true">
          <span />
        </span>

        <span>{title}</span>
      </div>

      <div className={styles.message}>
        <span className={styles.prefix}>{prefix}</span>
        <span className={styles.message_span}>{message}</span>
      </div>

      <div className={styles.chips} aria-label="Agent 能力标签">
        {chips.map((chip) => (
          <Tag className={styles.chip} key={chip}>
            {chip}
          </Tag>
        ))}
      </div>
    </section>
  );
}
