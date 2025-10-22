<template>
  <i :class="ns.b()" :style="style">
    <slot></slot>
  </i>
</template>
<script setup lang="ts">
import { iconProps } from "./icon";
import { useNamespace } from "@test-ui/hooks";
import { computed } from "vue";
const ns = useNamespace("icon");
defineOptions({
  name: "FlIcon",
});
const props = defineProps(iconProps);

const style = computed(() => {
  const { color, size } = props;
  if (!color && !size) {
    return {};
  }
  return {
    color: color ? color : "",
    fontSize: size ? `${size}px` : "",
  };
});
</script>
