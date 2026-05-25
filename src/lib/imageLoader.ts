const CMS_HOST_NAME = 'images.ctfassets.net'

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

export default function cloudflareLoader({ src, width, quality }: LoaderArgs): string {
  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join('&')
  if (workerUrl && !src.startsWith('/') && src.includes(CMS_HOST_NAME)) {
    const url = new URL(src)
    return `${workerUrl}${url.pathname}?${paramsString}`
  }
  return `${src}?${paramsString}`
}
