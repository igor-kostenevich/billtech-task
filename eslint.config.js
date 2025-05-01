import { defineConfig, globalIgnores } from 'eslint/config'
import vue from 'eslint-plugin-vue'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import tailwindcss from 'eslint-plugin-tailwindcss'
import prettierPlugin from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  globalIgnores(['.nuxt/**', 'node_modules/**', 'dist/**', '.output/**']),

  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useState: 'readonly',
        useCookie: 'readonly',
        useRuntimeConfig: 'readonly',
        useNotification: 'readonly',
        resolveComponent: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        reactive: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onBeforeUnmount: 'readonly',
        useHelpers: 'readonly',
        onUnmounted: 'readonly',
        nextTick: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        $fetch: 'readonly',
        useScrollTo: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
      tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      'no-debugger': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'vue/multi-word-component-names': 'off',
      'vue/no-template-shadow': 'off',
      'vue/no-useless-template-attributes': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-parsing-error': ['error', { 'x-invalid-end-tag': false }],
      'vue/no-v-html': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'any',
          },
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },
          multiline: { max: 1 },
        },
      ],
      'tailwindcss/no-custom-classname': 'off',
      'prettier/prettier': 'warn',
    },
  },
])
