/*
 * Deletes all agentDiscoveryApp entries. Use before migrating that
 * content type's schema so the field removal doesn't conflict with
 * existing entry data.
 *
 *   node cms-scripts/delete-discovery-entries.cjs
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

;(async () => {
  const client = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN })
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')

  let total = 0
  while (true) {
    const entries = await env.getEntries({ content_type: 'agentDiscoveryApp', limit: 100 })
    if (entries.items.length === 0) break
    for (const e of entries.items) {
      if (e.isPublished()) await e.unpublish()
      await e.delete()
      total++
    }
  }
  console.log(`Deleted ${total} agentDiscoveryApp entries.`)
})().catch((e) => {
  console.error('Failed:', e?.message || e)
  process.exit(1)
})
