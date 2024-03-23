import useSWR from 'swr';

async function fetchText(key: string) {
  return fetch(key).then((res) => res.text());
}

export function useText(filePath: string) {
  return useSWR(filePath, fetchText, { suspense: true });
}
