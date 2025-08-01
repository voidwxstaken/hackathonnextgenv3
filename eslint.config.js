// ESLint configuration for code quality and consistency
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// Export ESLint configuration using the new flat config format
export default tseslint.config(
  // Ignore the dist directory (build output)
  { ignores: ['dist'] },
  {
    // Extend recommended configurations
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // Apply to TypeScript and TSX files
    files: ['**/*.{ts,tsx}'],
    
    // Language options for parsing
    languageOptions: {
      // Use ES2020 features
      ecmaVersion: 2020,
      // Include browser global variables
      globals: globals.browser,
    },
    
    // Plugins for additional linting rules
    plugins: {
      // React Hooks rules for proper hook usage
      'react-hooks': reactHooks,
      // React Refresh rules for hot reload compatibility
      'react-refresh': reactRefresh,
    },
    
    // Specific linting rules
    rules: {
      // Apply recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Warn about components that aren't compatible with React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
