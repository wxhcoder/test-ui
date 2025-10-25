//读取packages/test-ui/package.json文件
import { copyFile } from 'fs/promises'
import { join, resolve } from 'path'
import { epRoot, epOutput } from '../utils/paths'
//将package.json文件移动到dist目录下
// epRoot : D:/IdeaProject/test-ui/packages/test-ui
const epPackage = resolve(epRoot, 'package.json')
//将/packages/test-ui/package.json文件移动到dist目录下
await copyFile(epPackage, join(epOutput, 'package.json'))
console.info('copy package.json to dist directory success')
