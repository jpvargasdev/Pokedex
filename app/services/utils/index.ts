export function getIdFromUrl(url: string) {
  const arr = url.split('/');
  const id = arr[arr.length - 2];
  return id;
}
