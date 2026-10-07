import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/examination/exam-admin/', '/admin/', '/api/'],
    },
    sitemap: 'https://swargumphan.com/sitemap.xml',
  }
}
