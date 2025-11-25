import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver // Check the full list of libraries in the docs
} from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        // Presets
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        '@vueuse/core',
        // Only type import
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        }
      ],
      // Automatically generate types
      dts: true,
      // Auto import inside Vue template
      vueTemplate: true
    }),
    Components({
      resolvers: [
        // Built-in resolver
        ElementPlusResolver(),
        // Custom resolver
        (componentName) => {
          // Where `componentName` is always CapitalCase
          if (['ValidationForm', 'ValidationField'].includes(componentName))
            return { name: componentName.split('Validation')[1], from: 'vee-validate' }
        }
      ],
      dts: true // Automatically generate types
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
