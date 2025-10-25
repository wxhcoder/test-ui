import { projRoot, buildOutput } from '../utils/paths'
import { Project } from 'ts-morph'
import { resolve } from 'path'
const TS_CONFIG_FILE_PATH = resolve(projRoot, 'tsconfig.json')
// buildOutput : D: /IdeaProject/test-ui/dist
const outDir = resolve(buildOutput, 'types')
const project = new Project({
  //编译选选项
  compilerOptions: {
    //仅生成.d.ts文件
    emitDeclarationOnly: true,
    //输出目录
    outDir,
    baseUrl: projRoot,
    // 它对应了 Node.js 中 --preserve-symlinks 选项的行为，Node.js 有这样一个选项：–preserve-symlinks，可以设置成按照软链所在的位置查找依赖
    preserveSymlinks: true,
    // 跳过.d.ts类型声明文件的类型检查。这样可以加快编译速度
    skipLibCheck: true,
    // 是否允许隐式声明 any 类型了
    noImplicitAny: false
  },
  tsConfigFilePath: TS_CONFIG_FILE_PATH
})
project.emit()
