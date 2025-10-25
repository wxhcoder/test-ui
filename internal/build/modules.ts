import { rollup } from 'rollup'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import Vue from '@vitejs/plugin-vue'
import { epOutput, epRoot, pkgRoot } from '../utils/paths'
import VueMacros from 'vue-macros/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import replace from '@rollup/plugin-replace'
import glob from 'fast-glob'

const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

//构建全量打包
const buildModules = async () => {
  //D:/IdeaProject/test-ui/packages/ 相对与这个路径获取文件
  const input = await glob('**/*.{js,ts,vue}', {
    cwd: pkgRoot,
    absolute: true, // 返回绝对路径
    onlyFiles: true // 只返回文件的路径
  })
  const bundle = await rollup({
    input: excludeFiles(input),
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx() // 如有需要
        }
      }),
      replace({
        //替换环境变量
        'process.env.NODE_ENV': '"production"',
        // 这个选项用于防止在字符串后面紧跟一个等号时进行替换。可以用于避免错误的赋值操作
        preventAssignment: true
      }),
      nodeResolve({
        extensions: ['.ts', '.tsx']
      }),
      esbuild({})
    ],
    //排除不要的包
    external: ['vue']
  })
  //ES Module
  bundle.write({
    format: 'esm', // 配置输出格式
    dir: resolve(epOutput, 'es'), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
    preserveModulesRoot: epRoot,
    exports: 'named',
    entryFileNames: `[name].mjs` // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
  })
  //commonJs
  bundle.write({
    format: 'cjs', // 配置输出格式
    dir: resolve(epOutput, 'lib'), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
    preserveModulesRoot: epRoot,
    exports: 'named',
    entryFileNames: `[name].cjs` // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
  })
}
buildModules()
