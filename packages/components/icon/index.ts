import _Icon from './src/icon.vue'
import { SFCWithInstall, withInstall } from '@test-ui/utils'
export const FlIcon: SFCWithInstall<typeof _Icon> = withInstall(_Icon)
export * from './src/icon'
export default FlIcon
