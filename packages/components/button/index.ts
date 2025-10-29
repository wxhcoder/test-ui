import { SFCWithInstall, withInstall } from '@test-ui/utils'
import _Button from './src/button.vue'
export const FlButton: SFCWithInstall<typeof _Button> = withInstall(_Button)
//导出组件
export default FlButton
export * from './src/button'
