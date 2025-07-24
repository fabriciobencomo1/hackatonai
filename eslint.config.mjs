import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'src/generated/**',
      'prisma/generated/**',
      '**/wasm*.js',
      '**/wasm*.ts'
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      
      // Next.js rules
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'warn',
      '@next/next/no-title-in-document-head': 'warn',
      '@next/next/google-font-display': 'warn',
      '@next/next/google-font-preconnect': 'warn',
      '@next/next/next-script-for-ga': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
      '@next/next/no-css-tags': 'warn',
      '@next/next/no-page-custom-font': 'warn'
    }
  }
];
