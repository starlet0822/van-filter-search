import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
      autoImport({
      // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      // dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'], // vue-router, vue-use ...
    }),
    Components({
      resolvers: [VantResolver()],
      // exclude: ['VanFilterSearch'] // 排除
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
