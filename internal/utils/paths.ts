import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

//当前文件paths.ts绝对路径
const __filename = fileURLToPath(import.meta.url)
//当前文件所在目录
const __dirname = dirname(__filename)

// 确定根目录，目前执行目录是在 ./internal/utils  返回的是项目根目录 D:/IdeaProject/test-ui
export const projRoot = resolve(__dirname, '..', '..')
// 拼接 ./packages 目录路径 这是组件库的目录 D:/IdeaProject/test-ui/packages
export const pkgRoot = resolve(projRoot, 'packages')
// 获取test-ui入库文件路径 D:/IdeaProject/test-ui/packages/test-ui
export const epRoot = resolve(pkgRoot, 'test-ui')
//在projRoot 基础上拼接 路径 internal，build 打包文件所在路径 D:/IdeaProject/test-ui/internal/build
export const buildRoot = resolve(projRoot, 'internal', 'build')

// 打包后的目录根目录 D:/IdeaProject/test-ui/dist
export const buildOutput = resolve(projRoot, 'dist')
// test-ui 打包后的目录 D:/IdeaProject/test-ui/dist/test-ui
export const epOutput = resolve(buildOutput, 'test-ui')
