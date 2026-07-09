import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'


export default defineConfig({
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
