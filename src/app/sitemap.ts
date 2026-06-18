import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

function getMetadataBase() {
  return new URL(
    process.env.NEXT_PUBLIC_METADATA_BASE || 'https://shirakawa-chuo-cc.com/'
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isRealProduction) {
    return [];
  }

  const metadataBase = getMetadataBase();

  return [
    {
      url: new URL('/', metadataBase).toString(),
    },
    {
      url: new URL('/entry/', metadataBase).toString(),
    },
  ];
}
