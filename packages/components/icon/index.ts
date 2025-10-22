import _Icon from "./src/icon.vue";
import { withInstall } from "@test-ui/utils";
const FlIcon = withInstall(_Icon);
export * from "./src/icon";
export default FlIcon;

declare module "vue" {
  export interface GlobalComponents {
    FlIcon: typeof FlIcon;
  }
}
