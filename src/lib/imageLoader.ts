const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL
if (!WORKER_URL) {
  throw new Error('NEXT_PUBLIC_WORKER_URL is not set')
}

const CMS_HOST_NAME = 'images.ctfassets.net'

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

export default function cloudflareLoader({ src, width, quality }: LoaderArgs): string {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join('&')
  if (!src.startsWith('/') && src.includes(CMS_HOST_NAME)) {
    const url = new URL(src)
    return `${WORKER_URL}${url.pathname}?${paramsString}`
  }
  return `${src}?${paramsString}`
}
