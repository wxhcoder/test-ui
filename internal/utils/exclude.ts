import { projRoot, normalizePath } from './paths'

// 定义一个函数，用于从文件列表中排除特定目录或文件
export function excludeFiles(files: string[]) {
  // 定义需要排除的目录或文件名称数组
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  // 获取项目根目录路径，并标准化路径格式（统一使用正斜杠）
  const projRootPath = normalizePath(projRoot)
  // 使用 filter 方法过滤文件列表
  return files.filter((file) => {
    //如果文件路径是根目录那么应该从根目录以后开始检索
    // D:/test-iui/packages/button/index.ts  test匹配到了根据路径
    //↑-----------↑-------------------------↑
    const position = file.startsWith(projRootPath) ? projRootPath.length : 0
    // 检查文件路径中是否包含任何需要排除的目录或文件名，若不包含则保留该文件
    return !excludes.some((exclude) => file.includes(exclude, position))
  })
}
