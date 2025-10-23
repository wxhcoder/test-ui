import type { PropType, ExtractPropTypes } from 'vue'

export const iconProps = {
  color: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 24
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
