import styles from "./launcher-hero.module.scss";
import { getProductMeta, SUITE_BRAND } from "@core/app-meta";

export function LauncherHero() {
  const meta = getProductMeta("launcher");

  if (!meta) return null;

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        {SUITE_BRAND.name} · {meta.displayName}
      </h1>
      <p className={styles.description}>{meta.tagline}</p>
    </section>
  );
}
