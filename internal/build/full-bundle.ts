import { rollup } from 'rollup'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import Vue from '@vitejs/plugin-vue'
import { epOutput, epRoot } from '../utils/paths'
import { PKG_CAMELCASE_NAME } from '../constants/src/pkg'
import VueMacros from 'vue-macros/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import replace from '@rollup/plugin-replace'

//构建全量打包
export const buildFullEntry = async () => {
  const bundle = await rollup({
    input: resolve(epRoot, 'index.ts'),
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
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx']
      }),
      esbuild({})
    ],
    //排除不要的包
    external: ['vue']
  })
  bundle.write({
    format: 'umd',
    file: resolve(epOutput, 'dist', 'index.full.js'),
    name: PKG_CAMELCASE_NAME,
    exports: 'named',
    globals: {
      // 将外部依赖 'vue' 映射到全局变量 'Vue'，避免打包时重复引入
      vue: 'Vue'
    }
  })
}
// buildFullEntry()
