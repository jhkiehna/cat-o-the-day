const pexelsApiKey = '563492ad6f917000010000017b40f39d8095444facc21e9d744ba5b0';

export default async function fetchCatsFallback(modifier: string): Promise<string[]> {
  let imageSrcs: string[] = [];

  const response = await fetch(`https://api.pexels.com/v1/search?query=cat${modifier ? `+${modifier}` : ''}`, {
    headers: { Authorization: pexelsApiKey },
    mode: 'cors',
  }).catch((error) => console.error(error));

  if (!response) return imageSrcs;

  const body = await response.json().catch((error) => console.error(error));

  if (body?.photos?.length) {
    imageSrcs = body.photos.map((photo) => photo?.src?.medium ?? photo?.src?.small ?? photo?.src?.large);
  }

  return imageSrcs;
}
