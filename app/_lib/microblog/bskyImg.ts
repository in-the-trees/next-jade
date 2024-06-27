export function getLinkFromUrl(url: string): string {
   return url.match(/\/([^\/]*)@./)?.[1] ?? "";
}
