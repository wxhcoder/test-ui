/// <reference types="vue/macros-global" />
/* prettier-ignore */
declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FlIcon: typeof import("test-ui")["FlIcon"];
    FlButton: typeof  import("test-ui")["FlButton"];
    FlInput: typeof import("test-ui")["FlInput"];
  }
}
export {}
