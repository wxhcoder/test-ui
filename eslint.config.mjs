//eslint 只用来检验语法，不要用它来校验格式
//校验JS规范 （推荐的）
import js from '@eslint/js'
import globals from 'globals'
//检验TS规范
import tseslint from 'typescript-eslint'
//推荐的Vue规范
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    //指定校验的文件
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  //TS规范
  tseslint.configs.recommended,
  //推荐的VUE规范
  pluginVue.configs['flat/essential'],
  //单独设置vue文件里的TS代码
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    //那些文件不被eslint校验
    ignores: ['.css', '*.d.ts', '.scss', '.html', '.json']
  },
  {
    rules: {
      //关闭any类型的校验
      '@typescript-eslint/no-explicit-any': 'off',
      //关闭{}类型的校验
      '@typescript-eslint/ban-types': 'off',
      'no-console': 'warn',
      //关闭必须驼峰验证
      camelcase: 'off'
    }
  },
  //使用prettier格式化 覆盖eslint的规范
  prettierRecommended
])
