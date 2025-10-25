import { projRoot, buildOutput } from '../utils/paths'
import { Project } from 'ts-morph'
import { pkgRoot, epRoot } from '../utils/paths'
import { excludeFiles } from '../utils/exclude'
import glob from 'fast-glob'
import { resolve, relative } from 'path'
import { readFile } from 'fs/promises'
import { parse, compileScript } from 'vue/compiler-sfc'

const TS_CONFIG_FILE_PATH = resolve(projRoot, 'tsconfig.json')
// buildOutput : D: /IdeaProject/test-ui/dist
const outDir = resolve(buildOutput, 'types')

/**
 * 添加项目的 TypeScript 或者.vue 源文件 到 ts-morph
 * @param project ts-morph 项目实例
 */
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
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        // 处理 .vue 文件
        const content = await readFile(file, 'utf-8')
        //解析vue文件
        const sfc = parse(content)
        //编译 script 标签内容
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          //获取 script 标签的内容
          let content = script?.content ?? ''
          //如果是 setup 就编译后拼接
          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, { id: 'xxx' })
            content += compiled.content
          }
          //script 标签的 lang  js/ts
          const lang = scriptSetup?.lang || script?.lang || 'js'
          // 创建 TypeScript 源文件
          // process.cwd()：获取当前进程工作目录
          // path.relative() 方法根据当前工作目录返回从 from 到 to 的相对路径
          //D:/IdeaProject/test-ui/packages/components/button/src/button.vue => components/button/src/button.vue.ts
          project.createSourceFile(`${relative(process.cwd(), file)}.${lang}`, content)
        }
        //
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
/**
 * 进行类型检查
 * @param project ts-morph 项目实例
 */
function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    console.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    console.error(err)
    throw err
  }
}

/**
 * 打包的主入口
 */
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
    // 取消从 tsconfig.json 文件中添加 TypeScript 源文件
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: TS_CONFIG_FILE_PATH
  })

  await addSourceFiles(project)
  // 进行类型检查
  typeCheck(project)
  // 生成类型声明文件
  project.emit()
}
generateTypesDefinitions()
