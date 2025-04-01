import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8000/api/v1/openapi.json',
  output: 'lib/client',
  plugins: ['@hey-api/client-fetch'],
});