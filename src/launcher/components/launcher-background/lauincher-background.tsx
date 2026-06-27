import styles from "./lauincher-background.module.scss";
export const LauncherBackground = () => {
  return (
    <>
      <div className={styles.gridLayer} />
      <div className={`${styles.spotlight} ${styles.spotlightOne}`} />
      <div className={`${styles.spotlight} ${styles.spotlightTwo}`} />
      <div className={`${styles.spotlight} ${styles.spotlightThree}`} />
    </>
  );
};
