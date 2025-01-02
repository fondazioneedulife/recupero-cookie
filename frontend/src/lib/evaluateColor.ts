import colors from "./colors.module.css";

export const evaluateBadgeColor = (valutazione: number) => {
  if (valutazione < 1) {
    return [colors.badge, colors.black];
  }
  if (valutazione < 6) {
    return [colors.badge, colors.red];
  }
  if (valutazione < 8) {
    return [colors.badge, colors.orange];
  }
  return [colors.badge, colors.green];
};
