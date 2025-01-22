import colors from "./colors.module.css";

/**
 * Ritorna le classi css necessarie per colorare la valutazione
 * @param valutazione number
 * @returns string
 */
export const evaluateBadgeColor = (valutazione: number) => {
  if (valutazione < 1) {
    return [colors.badge, colors.black].join(" ");
  }
  if (valutazione < 6) {
    return [colors.badge, colors.red].join(" ");
  }
  if (valutazione < 8) {
    return [colors.badge, colors.orange].join(" ");
  }
  return [colors.badge, colors.green].join(" ");
};
