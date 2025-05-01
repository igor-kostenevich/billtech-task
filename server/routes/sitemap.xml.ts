// server/routes/sitemap.xml.ts
export default defineEventHandler(async event => {
  const baseURL = 'https://family-love-haven.com'

  const routes = ['/']

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      route => `
    <url>
      <loc>${baseURL}${route}</loc>
      <changefreq>monthly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.7'}</priority>
    </url>`,
    )
    .join('\n')}
  </urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
