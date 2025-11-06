import { epOutput, pkgRoot } from '../utils/paths'
import { resolve } from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import { src, dest, TaskFunction, series } from 'gulp'

const distFolder = resolve(pkgRoot, 'theme-chalk', 'dist')
const distBundle = resolve(epOutput, 'theme-chalk')
const stylePath = resolve(pkgRoot, 'theme-chalk', 'src', '*.scss')
console.log(distFolder, '打包输出目录')
console.log(distBundle, '最总目录')
console.log(stylePath, '样式路径')
const buildThemeChalk = () => {
  //sass 编译器
  const sass = gulpSass(dartSass)
  return src(stylePath).pipe(sass()).pipe(dest(distFolder))
}
const buildTask: TaskFunction = series(buildThemeChalk)
export default buildTask
