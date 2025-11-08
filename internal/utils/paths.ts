import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import { PKG_NAME, PKG_PREFIX } from '../constants'
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
//D:/IdeaProject/test-ui/typing
export const epTyping = resolve(projRoot, 'typing')

// 打包后的目录根目录 D:/IdeaProject/test-ui/dist
export const buildOutput = resolve(projRoot, 'dist')
// test-ui 打包后的目录 D:/IdeaProject/test-ui/dist/test-ui
export const epOutput = resolve(buildOutput, 'test-ui')
// theme-chalk 目录 D:/IdeaProject/test-ui/packages/theme-chalk
export const themeChalkFolder = resolve(pkgRoot, 'theme-chalk')

/**
 * 路径重写器，用于将 @test-ui 替换为 test-ui
 * @returns
 */
export const pathRewriter = () => {
  return (id: string) => {
    id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    id = id.replaceAll(`${PKG_PREFIX}/`, `${PKG_NAME}/es/`)
    return id
  }
}
