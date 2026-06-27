import type { HeroSummaryStatus } from "./home.type";

export const heroSummaryStatusColorMap: Record<HeroSummaryStatus, string> = {
  ready: "green",
  review: "gold",
  active: "blue",
};

export const heroSummaryStatusLabelMap: Record<HeroSummaryStatus, string> = {
  ready: "Ready",
  review: "Review",
  active: "Active",
};
