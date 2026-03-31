import { defineConfig } from 'tsup';

export default defineConfig({
   entry: ['index.ts'],
   format: ['esm'],
   splitting: false,
   clean: true,
   outDir: 'dist',
   external: [
      'dotenv',
      'express',
      'i18next',
      'i18next-fs-backend',
      'openai',
      'supabase',
      '@supabase/supabase-js',
      'zod',
   ],
});
