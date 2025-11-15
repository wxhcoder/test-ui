// 存储组件相关类型 和事件
//size 组件大小
//type 颜色展示类型
//round 圆角
//loading 加载中
//disabled 禁用
//native-type 原生类型
//icon-placment 图标位置

//插槽icon
import { ExtractPropTypes, PropType } from 'vue'
export type Size = 'small' | 'medium' | 'large'
export type Type = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type IconPlacment = 'left' | 'right'
export type NativeType = 'button' | 'submit' | 'reset'

export const ButtonProps = {
  // 这里先声明为String类型,然后通过PropType转换为Size类型
  // 这是因为Vue的props类型系统需要运行时的类型信息
  // String as PropType<Size>的写法可以让TypeScript在编译时进行类型检查,同时在运行时保持正确的类型信息
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  type: {
    type: String as PropType<Type>,
    default: 'primary'
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: String as PropType<NativeType>,
  iconPlacment: {
    type: String as PropType<IconPlacment>,
    default: 'left'
  }
} as const

export const ButtonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
}
const a = '1'
console.log(a)
export type ButtonProps = ExtractPropTypes<typeof ButtonProps>
export type ButtonEmits = typeof ButtonEmits

export function sum(a: number, b: number) {
  return a + b
}
