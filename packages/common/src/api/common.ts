export const handleRequestPost = async (
  url: string,
  payload: any,
  headers: { [key: string]: string } = {}
) => {
  console.log(url);

  const response = await fetch(url, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
