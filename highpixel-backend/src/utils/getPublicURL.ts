import { highpixelConfig } from "@config/highpixel.config";

export const getPublicURL = () => {
  return `${highpixelConfig.productionURL}`;
}