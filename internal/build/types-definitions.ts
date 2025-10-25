import { projRoot, buildOutput } from '../utils/paths'
import { Project } from 'ts-morph'
import { pkgRoot, epRoot } from '../utils/paths'
import { excludeFiles } from '../utils/exclude'
import glob from 'fast-glob'
import { resolve } from 'path'
import { readFile } from 'fs/promises'

const TS_CONFIG_FILE_PATH = resolve(projRoot, 'tsconfig.json')
// buildOutput : D: /IdeaProject/test-ui/dist
const outDir = resolve(buildOutput, 'types')

async function addSourceFiles(project: Project) {
  // 读取的文件类型 .js .jsx .ts .tsx .vue
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  // excludeFiles 函数上文有介绍，也就是过滤一些不需要的文件
  const filePaths = excludeFiles(
    //'!test-ui/**/*' 说明要排除 package/test-ui包下的文件
    await glob([globSourceFile, '!test-ui/**/*'], {
      // 读取 packages 目录下除了 test-ui 目录的文件
      cwd: pkgRoot,
      // 读取绝对路径
      absolute: true,
      // 只读取文件
      onlyFiles: true
    })
  )
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      // 读取 ./packages/test-ui 目录下的文件
      cwd: epRoot,
      // 只读取文件
      onlyFiles: true
    })
  )
  console.log('组件文件', filePaths)
  console.log('包的入口文件', epPaths)
  await Promise.all([
    ...filePaths.map((file) => {
      if (file.endsWith('.vue')) {
        // 处理 .vue 文件
      } else {
        // 如果不是 .vue 文件则 addSourceFileAtPath 添加文件路径的方式添加 ts-morph 项目的 TypeScript 源文件
        project.addSourceFileAtPath(file)
      }
    }),
    ...epPaths.map(async (file) => {
      // 读取 ./packages/test-ui 目录下的文件，并手动通过 createSourceFile 方法添加 ts-morph 项目的 TypeScript 源文件
      //epRoot : D:/IdeaProject/test-ui/packages/test-ui / epPaths: [ 'components.ts', 'defaults.ts', 'index.ts', 'install.ts' ]
      const content = await readFile(resolve(epRoot, file), 'utf-8')
      // 以构建新的文件路径以达到移动的目的 pkgRoot:D:/IdeaProject/test-ui/packages
      project.createSourceFile(resolve(pkgRoot, file), content)
    })
  ])
}

const generateTypesDefinitions = async () => {
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

  await addSourceFiles(project)
  project.emit()
}
generateTypesDefinitions()
