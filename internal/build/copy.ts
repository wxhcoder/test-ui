//读取packages/test-ui/package.json文件
import { copyFile, cp } from 'fs/promises'
import { remove } from 'fs-extra'
import { join, resolve } from 'path'
import { epRoot, epOutput, epTyping, buildOutput, themeChalkFolder } from '../utils/paths'
//将package.json文件移动到dist目录下
// epRoot : D:/IdeaProject/test-ui/packages/test-ui
const epPackage = resolve(epRoot, 'package.json')
const epTypes = resolve(epTyping, 'global.d.ts')
//将/packages/test-ui/package.json文件移动到dist目录下
export const copy = async () => {
  await copyFile(epPackage, join(epOutput, 'package.json'))
  console.info('package.json copy success')
  await cp(epTypes, join(epOutput, 'global.d.ts'))
  console.info('global.d.ts copy success')
  const src = resolve(buildOutput, 'types', 'packages')
  await cp(src, resolve(epOutput, 'es'), {
    recursive: true, // 必须要有！
    force: true // 如果目标存在会覆盖
  })
  console.info('es copy success')
  await cp(src, resolve(epOutput, 'lib'), {
    recursive: true, // 必须要有！
    force: true // 如果目标存在会覆盖
  })
  console.info('lib copy success')
  //删除types文件夹
  await remove(resolve(buildOutput, 'types'))
  //tsconfig.tsbuildinfo
  await remove(resolve(buildOutput, 'tsconfig.tsbuildinfo'))
  //删除 theme-chalk/dist 目录
  await remove(resolve(themeChalkFolder, 'dist'))
}
// 执行复制操作
// await copy()
