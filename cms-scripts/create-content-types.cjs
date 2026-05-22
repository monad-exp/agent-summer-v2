/*
 * One-shot script: creates and activates the four agent content types
 * (agentCampaign, agentAnnouncement, agentDiscoveryApp, agentSkillMarkdown)
 * in the configured Contentful space/env.
 *
 * Reads creds from cms-scripts/.env (CONTENTFUL_SPACE_ID,
 * CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT).
 *
 * Idempotent: if a content type already exists it updates the existing
 * version rather than failing.
 *
 * Run with:
 *   node cms-scripts/create-content-types.cjs
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

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'

if (!SPACE_ID || !TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

const COMPETITION_TYPES = [
  'game',
  'trading',
  'research',
  'security',
  'social',
  'development',
  'other',
]
const ENTRY_MODES = ['open', 'allowlist', 'invite_only', 'qualification']
const PRIZE_KINDS = ['pool', 'fixed', 'sponsored', 'none']
const ANNOUNCEMENT_CATEGORIES = [
  'release',
  'partner',
  'launch',
  'campaign',
  'protocol',
]
const SKILL_STATUS = ['draft', 'published', 'deprecated']

const CONTENT_TYPES = [
  {
    id: 'agentCampaign',
    name: 'Agent Campaign',
    description: 'Competitions that AI agents can join (games, trading, research, etc.).',
    displayField: 'title',
    fields: [
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }, { regexp: { pattern: '^[a-z0-9-]+$' } }] },
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'summary', name: 'Summary', type: 'Text', required: true },
      { id: 'url', name: 'URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },
      { id: 'datePublished', name: 'Date published', type: 'Date', required: true },

      { id: 'hostName', name: 'Host name', type: 'Symbol', required: true },
      { id: 'hostUrl', name: 'Host URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },
      { id: 'hostLogo', name: 'Host logo', type: 'Link', linkType: 'Asset', required: true },

      { id: 'startsAt', name: 'Starts at', type: 'Date', required: true },
      { id: 'endsAt', name: 'Ends at', type: 'Date', required: true },
      { id: 'registrationOpensAt', name: 'Registration opens at', type: 'Date' },
      { id: 'registrationClosesAt', name: 'Registration closes at', type: 'Date' },

      { id: 'competitionType', name: 'Competition type', type: 'Symbol', required: true, validations: [{ in: COMPETITION_TYPES }] },
      { id: 'entryMode', name: 'Entry mode', type: 'Symbol', required: true, validations: [{ in: ENTRY_MODES }] },
      { id: 'maxAgents', name: 'Max agents', type: 'Integer', validations: [{ range: { min: 0 } }] },
      { id: 'rulesUrl', name: 'Rules URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },
      { id: 'scoring', name: 'Scoring', type: 'Text', required: true },
      { id: 'requiresRegistration', name: 'Requires registration', type: 'Boolean', required: true },

      { id: 'prizeAmount', name: 'Prize amount', type: 'Symbol' },
      { id: 'prizeCurrency', name: 'Prize currency', type: 'Symbol' },
      { id: 'prizeKind', name: 'Prize kind', type: 'Symbol', validations: [{ in: PRIZE_KINDS }] },

      { id: 'skillsRequired', name: 'Skills required', type: 'Array', items: { type: 'Symbol' } },

      { id: 'ctaLabel', name: 'CTA label', type: 'Symbol', required: true },
      { id: 'ctaUrl', name: 'CTA URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },

      { id: 'fields', name: 'Card fields (flexible)', type: 'Object' },
    ],
  },
  {
    id: 'agentAnnouncement',
    name: 'Agent Announcement',
    description: 'Release notes, partner updates, campaign launches, and protocol updates.',
    displayField: 'title',
    fields: [
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }, { regexp: { pattern: '^[a-z0-9-]+$' } }] },
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'summary', name: 'Summary', type: 'Text', required: true },
      { id: 'url', name: 'URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },
      { id: 'datePublished', name: 'Date published', type: 'Date', required: true },
      { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
      { id: 'category', name: 'Category', type: 'Symbol', required: true, validations: [{ in: ANNOUNCEMENT_CATEGORIES }] },
    ],
  },
  {
    id: 'agentDiscoveryApp',
    name: 'Agent Discovery App',
    description:
      'Apps, protocols, or dApps that agents can use. Links to a mainnetAppsCategory entry as the source of truth for name/logo/website.',
    displayField: 'slug',
    fields: [
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }, { regexp: { pattern: '^[a-z0-9-]+$' } }] },
      {
        id: 'app',
        name: 'App',
        type: 'Link',
        linkType: 'Entry',
        required: true,
        validations: [{ linkContentType: ['mainnetAppsCategory'] }],
      },
      { id: 'description', name: 'Agent-facing description', type: 'Text', required: true },
      { id: 'categories', name: 'Categories', type: 'Array', required: true, items: { type: 'Symbol' } },
      { id: 'skillMdUrl', name: 'skill.md URL', type: 'Symbol', required: true, validations: [{ regexp: { pattern: '^https?://' } }] },
      { id: 'skillsCount', name: 'Skills count', type: 'Integer', required: true, validations: [{ range: { min: 0 } }] },
      { id: 'verifiedAt', name: 'Verified at', type: 'Date' },
    ],
  },
  {
    id: 'agentSkillMarkdown',
    name: 'Agent skill.md',
    description: 'Canonical onboarding document read by agents during registration.',
    displayField: 'version',
    fields: [
      { id: 'version', name: 'Version', type: 'Symbol', required: true, validations: [{ unique: true }, { regexp: { pattern: '^v[0-9]+\\.[0-9]+(\\.[0-9]+)?$' } }] },
      { id: 'title', name: 'Title (H1)', type: 'Symbol', required: true },
      { id: 'body', name: 'Body (markdown)', type: 'Text', required: true },
      { id: 'status', name: 'Status', type: 'Symbol', required: true, validations: [{ in: SKILL_STATUS }] },
      { id: 'publishedAt', name: 'Published at', type: 'Date', required: true },
    ],
  },
]

async function upsertContentType(env, spec) {
  let existing = null
  try {
    existing = await env.getContentType(spec.id)
  } catch (e) {
    if (e.name !== 'NotFound' && e.status !== 404) throw e
  }

  if (!existing) {
    console.log(`[create] ${spec.id}`)
    let ct = await env.createContentTypeWithId(spec.id, {
      name: spec.name,
      description: spec.description,
      displayField: spec.displayField,
      fields: spec.fields,
    })
    ct = await ct.publish()
    console.log(`  -> activated (version ${ct.sys.version})`)
    return
  }

  console.log(`[update] ${spec.id}`)
  const newFieldIds = new Set(spec.fields.map((f) => f.id))
  const toRemove = existing.fields.filter((f) => !newFieldIds.has(f.id))

  // Phase 1: mark removed fields as omitted (required before deletion in Contentful).
  if (toRemove.some((f) => !f.omitted)) {
    console.log(`  phase 1 — omitting: ${toRemove.map((f) => f.id).join(', ')}`)
    existing.fields = existing.fields.map((f) =>
      newFieldIds.has(f.id) ? f : { ...f, omitted: true },
    )
    existing = await existing.update()
    existing = await existing.publish()
  }

  // Phase 2: apply the new spec (dropping omitted fields, adding new ones).
  existing.name = spec.name
  existing.description = spec.description
  existing.displayField = spec.displayField
  existing.fields = spec.fields
  existing = await existing.update()
  existing = await existing.publish()
  console.log(`  -> activated (version ${existing.sys.version})`)
}

;(async () => {
  const client = createClient({ accessToken: TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const env = await space.getEnvironment(ENVIRONMENT)
  for (const spec of CONTENT_TYPES) {
    await upsertContentType(env, spec)
  }
  console.log('Done.')
})().catch((e) => {
  console.error('Failed:', e?.message || e)
  if (e?.message?.includes('{')) {
    try {
      const parsed = JSON.parse(e.message)
      console.error(JSON.stringify(parsed, null, 2))
    } catch {}
  }
  process.exit(1)
})
