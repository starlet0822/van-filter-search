import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'
import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    build: {
      outDir: 'dist',
      // cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
      lib: {
        entry: pathResolve('src/index.js'),
        name: pkg.name,
        // formats: ['es', 'iife'],
        fileName: (format) => `${pkg.name}.${format}.js`, // 打包后的文件名
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖：不生效？
        external: ['vue', 'vant'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            vant: 'Vant',
          },
          exports: 'named'
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console.log()
          drop_console: true,
          drop_debugger: true,
        },
      },
    },

    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : [],
    },

    plugins: [
      vue(),
      vueJsx(),
      autoImport({
        imports: ['vue', 'vue-router'], // vue-router, vue-use ...
      }),
      components({
        resolvers: [VantResolver()]
      }),
      cssInjectedByJsPlugin()
    ],
    define: { 'process.env': {} },

    resolve: {
      // 路径别名配置
      alias: {
        '@': pathResolve('dev'),
        // '@packages': pathResolve('packages'),
      },
    },

    css: {
      // 全局使用scss变量
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
        less: {
          javascriptEnabled: true, // 支持less
          // 覆盖样式变量
          modifyVars: {
            // 'text-color': '#f40',
            // 'border-color': '#eee',
          },
        },
      },
    },
  }
})
