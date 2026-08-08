import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'


export default defineConfig({
  server:{
    proxy: {
      '/api/v1': {
        target: 'https://axonode.org',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://www.axonode.org',
      dynamicRoutes: [
        '/',
        '/join',
        '/login',
        '/invited',
        '/projects',
        '/terms',
        '/conduct',
        '/privacy'
      ],
      robots: [{userAgent: '*', allow: '/', disallow: ['/invited', '/profile','/credentials']}]
    })
  ]
})
