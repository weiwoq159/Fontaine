import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Typography } from "antd";

import styles from "./launcher-command.module.scss";

export function LauncherCommand() {
  const [actions] = useState(["Launch", "Search", "Run"]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.glow} />
      <div className={styles.shell}>
        <span className={styles.agentDot} />
        <Input
          className={styles.input}
          variant="borderless"
          prefix={<SearchOutlined />}
          placeholder={`诸位，不必拘谨！此刻，就让我听听——你们完成怎样的伟业？`}
        />
        <Space className={styles.actions} size={8}>
          {actions.map((item) => (
            <Typography.Text key={item}>{item}</Typography.Text>
          ))}
        </Space>
        <kbd className={styles.shortcut}>⌘K</kbd>
      </div>
    </section>
  );
}
