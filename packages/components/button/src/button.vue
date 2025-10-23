<template>
  <button
    :class="[
      bem.b(),
      bem.m(size),
      bem.m(type),
      bem.is('disabled', disabled),
      bem.is('loading', loading),
      bem.is('round', round)
    ]"
    :type="nativeType"
    :disabled="disabled"
    @click="buttonClick">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { useNamespace } from '@test-ui/hooks/use-namespace/index'
import { ButtonProps, ButtonEmits } from './button'
const bem = useNamespace('button')
//定好好组件名后 eslit就不会报错 Component name "button" should always be multi-word.eslintvue/multi-word-component-names
defineOptions({ name: 'FlButton' })
const emit = defineEmits(ButtonEmits)
const { type, size, disabled, nativeType, round } = defineProps(ButtonProps)
//发送事件
const buttonClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>
<style scoped></style>
