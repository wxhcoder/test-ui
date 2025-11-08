import { series, parallel } from 'gulp'
import { run } from '../utils/process'
import { mkdir } from 'fs/promises'
import { epOutput } from '../utils/paths'
import { buildFullEntry } from './full-bundle'
import { buildModules } from './modules'
import { generateTypesDefinitions } from './types-api-extractor'
import { copy } from './copy'
/**
 * 清理dist文件夹
 */
const clean = () => run('pnpm run clean')

/**
 * 创建dist文件夹
 */
const make = () => mkdir(epOutput, { recursive: true })
/**
 * 编译scss文件
 * @returns
 */
const buildStyle = () => run('pnpm -C internal/build run buildStyle')

export default series(
  //先清理dist文件夹
  clean,
  //创建dist/test-ui文件夹
  make,
  //开发编译打包
  parallel(buildFullEntry, buildModules, generateTypesDefinitions, buildStyle),
  //复制package.json和global.d.ts文件到dist目录下
  copy
)
