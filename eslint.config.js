import svelteConfig from './svelte.config.js'
import { defineConfig } from 'eslint/config'
import svelte from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  },

  {
    ignores: ['tests/__data__/**', 'docs/**', '.svelte-kit/**']
  },

  {
    rules: {
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/no-at-html-tags': 'off'
    }
  }
])
