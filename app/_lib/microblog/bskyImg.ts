export function getLinkFromUrl(url: string): string {
   return url.match(/\/([^\/]*)@./)?.[1] ?? "";
}

enum Format {
   JPEG = "jpeg",
   AVIF = "avif",
   WEBP = "webp",
}

enum Size {
   THUMB = "thumb",
   FULL = "full",
}

export function bskyImg(
   did: string,
   ref: string,
   format: Format,
   size: Size = Size.FULL,
): string {
   return `https://cdn.bsky.app/img/feed_${size === Size.FULL ? "fullsize" : "thumbnail"}/plain/${did}/${ref}@${format}`;
}

bskyImg.Format = Format;
bskyImg.Size = Size;
