import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

export default defineConfig({
  // Tùy chỉnh Astro ở đây nếu cần
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});