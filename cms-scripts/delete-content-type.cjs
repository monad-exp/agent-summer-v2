/*
 * Deletes a Contentful content type along with all its entries.
 * Usage:  node cms-scripts/delete-content-type.cjs <contentTypeId>
 */

const path = require('node:path')
const fs = require('node:fs')

const ENV_PATH = path.resolve(__dirname, '.env')
if (fs.existsSync(ENV_PATH)) {
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

const SDK_PATH =
  process.env.CONTENTFUL_SDK_PATH ||
  '/Users/marcus/Desktop/code/monapp-portal/node_modules/contentful-management'
const { createClient } = require(SDK_PATH)

const targetId = process.argv[2]
if (!targetId) {
  console.error('Usage: node cms-scripts/delete-content-type.cjs <contentTypeId>')
  process.exit(1)
}

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'

;(async () => {
  const client = createClient({ accessToken: TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const env = await space.getEnvironment(ENVIRONMENT)

  console.log(`Deleting all entries for content type "${targetId}"...`)
  let total = 0
  while (true) {
    const entries = await env.getEntries({ content_type: targetId, limit: 100 })
    if (entries.items.length === 0) break
    for (const entry of entries.items) {
      if (entry.isPublished()) {
        await entry.unpublish()
      }
      await entry.delete()
      total++
    }
    console.log(`  deleted ${total} entries...`)
  }
  console.log(`Deleted ${total} entries total.`)

  console.log(`Unpublishing & deleting content type "${targetId}"...`)
  const ct = await env.getContentType(targetId)
  if (ct.isPublished()) {
    await ct.unpublish()
  }
  await ct.delete()
  console.log('Done.')
})().catch((e) => {
  console.error('Failed:', e?.message || e)
  process.exit(1)
})
