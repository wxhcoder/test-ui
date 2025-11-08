import { Transform } from 'stream'
import { epOutput, pkgRoot } from '../utils/paths'
import { resolve, basename } from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import { src, dest, TaskFunction, series, parallel } from 'gulp'
import consola from 'consola'
import postcss from 'postcss'
import cssnano from 'cssnano'
import Vinyl from 'vinyl'
import chalk from 'chalk'

const distFolder = resolve(pkgRoot, 'theme-chalk', 'dist')
const themeChalkFolder = resolve(pkgRoot, 'theme-chalk')
const distBundle = resolve(epOutput, 'theme-chalk')
const stylePath = resolve(pkgRoot, 'theme-chalk', 'src', '*.scss')
consola.info(chalk.green(distFolder), '打包输出目录')
consola.info(chalk.green(distBundle), '最总目录')
consola.info(chalk.green(stylePath), '样式路径')
/**
 * 自定义压缩css插件 返回一个文件流适配gulp管道
 * @returns stream Transform
 */
const compressWithCssnano = () => {
  //postcss 编译器
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          //不压缩颜色值（例如保留 #ffffff 而不是改为 #fff），防止与主题变量冲突。
          colormin: false,
          //不压缩字体定义（避免 "Open Sans", sans-serif 这种被改动）
          minifyFontValues: false
        }
      ]
    })
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      //Vinyl 是gulp 文件系统
      const file = chunk as Vinyl
      //空文件不处理
      if (file.isNull()) {
        callback(null, file)
        return
      }
      //不是文件流不处理
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        //获取文件名,无法
        const name = basename(file.path)
        //将编译完的文本 转换成Buffer 类型 并赋值给文件内容
        file.contents = Buffer.from(result.css)
        //打印日志
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`
        )
        //将处理后的文件 传递给下一个插件
        callback(null, file)
      })
    }
  })
}
/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 * @returns
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export function copyThemeChalkSource() {
  return src(resolve(themeChalkFolder, 'src/**')).pipe(dest(resolve(distBundle, 'src')))
}
const buildThemeChalk = () => {
  //sass 编译器
  const sass = gulpSass(dartSass)
  //着三个sass文件不加前缀
  const noElPrefixFile = /(index|base|display)/
  return (
    src(stylePath)
      .pipe(sass())
      // 自动添加浏览器前缀 cascade: false 未压缩前支持 visual cascade 增加浏览器前缀 ,true 未压缩就不加前缀
      //比如: user-select 这个css属性,在使用autoprefixer 编译后就会变成如下代码
      //-webkit-user-select: none; -moz-user-select: none; user-select: none;
      .pipe(autoprefixer({ cascade: false }))
      .pipe(compressWithCssnano())
      .pipe(
        //从gulp流中获取文件,并改写文件名
        rename((filePath) => {
          if (!noElPrefixFile.test(filePath.basename)) {
            filePath.basename = `fl-${filePath.basename}`
          }
        })
      )
      .pipe(dest(distFolder))
  )
}
const buildTask: TaskFunction = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
)
export default buildTask
