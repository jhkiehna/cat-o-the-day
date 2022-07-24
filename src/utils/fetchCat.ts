const pexelsApiKey = '563492ad6f917000010000017b40f39d8095444facc21e9d744ba5b0';

export default async function fetchCatPexels(): Promise<string> {
  const response = await fetch('https://api.pexels.com/v1/search?query=cat', {
    headers: { Authorization: pexelsApiKey },
    mode: 'cors',
  }).catch((error) => console.error(error));

  if (!response) return;

  const body = await response.json().catch((error) => console.error(error));

  if (!body?.photos?.length) return;

  const photo = body.photos[Math.floor(Math.random() * body.photos.length)];
  const uri = photo?.src?.medium ?? photo?.src?.small ?? photo?.src?.large;

  return uri;
}
