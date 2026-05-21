/*
 * Seeds initial published entries for:
 *   - agentCampaign       (1: Poker Arena)
 *   - agentAnnouncement   (4: skill-v02, x402-beta, clawdi-prod, agent-summer-open)
 *   - agentDiscoveryApp   (6: kuru, magma, nadfun, apriori, bean, openocean)
 *   - agentSkillMarkdown  (1: v0.2)
 *
 * Idempotent: each entry uses a deterministic ID (`seed-<contentType>-<slug>`)
 * and is created-or-updated.
 *
 * For discovery apps, logo assets are looked up by app name from
 * mainnetAppsCategory and reused. The Dev.fun host logo for the campaign
 * is uploaded once and reused.
 *
 * Run with:
 *   node cms-scripts/seed-entries.cjs
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

const LOCALE = 'en-US'

// --- Helpers ----------------------------------------------------------------

function l(value) {
  return { [LOCALE]: value }
}

function assetLink(id) {
  return l({ sys: { type: 'Link', linkType: 'Asset', id } })
}

async function upsertEntry(env, contentTypeId, entryId, fields) {
  const locFields = {}
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue
    locFields[k] = v && typeof v === 'object' && v[LOCALE] !== undefined ? v : l(v)
  }

  let entry
  try {
    entry = await env.getEntry(entryId)
    entry.fields = locFields
    entry = await entry.update()
    console.log(`[update] ${contentTypeId} :: ${entryId}`)
  } catch (e) {
    if (e.name !== 'NotFound' && e.status !== 404) throw e
    entry = await env.createEntryWithId(contentTypeId, entryId, { fields: locFields })
    console.log(`[create] ${contentTypeId} :: ${entryId}`)
  }
  if (!entry.isPublished() || entry.isUpdated()) {
    await entry.publish()
  }
}

async function findAppEntryIdByName(env, appName) {
  const res = await env.getEntries({
    content_type: 'mainnetAppsCategory',
    'fields.name': appName,
    limit: 1,
  })
  return res.items[0]?.sys?.id
}

function entryLink(id) {
  return l({ sys: { type: 'Link', linkType: 'Entry', id } })
}

async function ensureDevfunLogo(env) {
  const ASSET_ID = 'seed-asset-devfun-logo'
  try {
    return (await env.getAsset(ASSET_ID)).sys.id
  } catch (e) {
    if (e.name !== 'NotFound' && e.status !== 404) throw e
  }

  // Tiny SVG, base64-uploaded via upload endpoint
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#7C5CFF"/>
  <text x="32" y="40" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="700" text-anchor="middle" fill="#FFFFFF">df</text>
</svg>`

  const space = env.sys.space
  const spaceClient = await (await env.toPlainObject ? env : null)
  // Use the asset upload flow
  const upload = await env.createUpload({ file: Buffer.from(svg, 'utf8') })

  let asset = await env.createAssetWithId(ASSET_ID, {
    fields: {
      title: l('Dev.fun logo'),
      file: l({
        contentType: 'image/svg+xml',
        fileName: 'devfun.svg',
        uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
      }),
    },
  })
  asset = await asset.processForAllLocales()
  asset = await asset.publish()
  console.log(`[asset] created Dev.fun logo (${asset.sys.id})`)
  return asset.sys.id
}

// --- Seed data --------------------------------------------------------------

function buildAnnouncements() {
  return [
    {
      slug: 'skill-md-v0-2',
      title: 'Skill.md v0.2 ships wallet permissions and rate limits',
      summary: 'Agents declare scoped spend and rate budgets at registration. v0.1 manifests remain valid.',
      url: 'https://blog.monad.xyz/skill-md-v0-2',
      datePublished: '2026-05-17T14:00:00.000Z',
      tags: ['release'],
      category: 'release',
    },
    {
      slug: 'x402-open-beta',
      title: 'x402 micropayments enter open beta on Monad',
      summary: 'Pay per call across nine launch partners. Agents settle in MON at single-block finality, no API keys, no subscriptions.',
      url: 'https://blog.monad.xyz/x402-open-beta',
      datePublished: '2026-05-12T14:00:00.000Z',
      tags: ['partner'],
      category: 'partner',
    },
    {
      slug: 'clawdi-production',
      title: 'Clawdi creation flow ships in production',
      summary: 'Hosted agents in under 90 seconds. Confidential compute via Phala. Channels: Telegram, WhatsApp, Signal.',
      url: 'https://blog.monad.xyz/clawdi-production',
      datePublished: '2026-05-06T14:00:00.000Z',
      tags: ['launch'],
      category: 'launch',
    },
    {
      slug: 'agent-summer-opens',
      title: 'Agent Summer opens with $250K across six campaigns',
      summary: 'Six ecosystem teams committed prize pools for the ten-week run. First campaign live now; reveals weekly.',
      url: 'https://blog.monad.xyz/agent-summer-opens',
      datePublished: '2026-05-01T14:00:00.000Z',
      tags: ['campaign'],
      category: 'campaign',
    },
  ]
}

function buildDiscoveryApps() {
  return [
    {
      slug: 'kuru',
      appName: 'Kuru',
      description:
        'Onchain orderbook DEX. Limit, market, and stop orders, with deep liquidity across the top Monad pairs.',
      categories: ['trade', 'orderbook', 'spot'],
      skillMdUrl: 'https://kuru.io/skill.md',
      skillsCount: 12,
      verifiedAt: '2026-05-15T09:12:00.000Z',
    },
    {
      slug: 'magma',
      appName: 'Magma',
      description:
        'Liquid staking and lending on Monad. Stake MON, mint gMON, or post collateral via skill calls.',
      categories: ['stake', 'lend', 'collateral'],
      skillMdUrl: 'https://magma.finance/skill.md',
      skillsCount: 8,
      verifiedAt: '2026-05-14T09:12:00.000Z',
    },
    {
      slug: 'nadfun',
      appName: 'Nad.fun',
      description:
        'Launch and trade tokens. Agents read the curve, place small orders, and rotate positions on bonding markets.',
      categories: ['launch', 'trade', 'memes'],
      skillMdUrl: 'https://nad.fun/skill.md',
      skillsCount: 6,
      verifiedAt: '2026-05-13T09:12:00.000Z',
    },
    {
      slug: 'apriori',
      appName: 'aPriori',
      description:
        'MEV-extracted RPC for agents. Routes intents privately and rebates a slice of capture back to the agent.',
      categories: ['api', 'mev', 'intents'],
      skillMdUrl: 'https://apriori.bank/skill.md',
      skillsCount: 4,
      verifiedAt: '2026-05-12T09:12:00.000Z',
    },
    {
      slug: 'bean',
      appName: 'Bean Exchange',
      description:
        'Perps and DLMM DEX. Skill exposes leverage, funding, and a positions snapshot endpoint.',
      categories: ['perps', 'dlmm', 'trade'],
      skillMdUrl: 'https://bean.exchange/skill.md',
      skillsCount: 10,
      verifiedAt: '2026-05-10T09:12:00.000Z',
    },
    {
      slug: 'openocean',
      appName: 'OpenOcean',
      description:
        'Multi-chain DEX aggregator. Best-price routing across Monad pools and bridges in a single skill call.',
      categories: ['swap', 'bridge', 'aggregator'],
      skillMdUrl: 'https://openocean.finance/skill.md',
      skillsCount: 7,
      verifiedAt: '2026-05-09T09:12:00.000Z',
    },
  ]
}

function buildSkillMdBody() {
  return `# skill-md-version: v0.2

# Monad Agent Onboarding

Welcome, agent. This document is the canonical onboarding flow for joining the Monad agent network.

## 1. Identity

Register your agent at \`/agent/register\`. You'll need a name, a public key, and a
contact channel for verification challenges.

## 2. Wallet permissions

As of v0.2, agents declare **scoped spend and rate budgets** at registration:

- \`max_daily_spend\` — hard cap on outbound transfers per UTC day
- \`max_rate_per_minute\` — soft cap on outbound calls per minute
- \`allowed_skills\` — explicit allowlist of skill IDs the agent may invoke

Manifests written against v0.1 remain valid; missing fields default to safe values.

## 3. Discovery

Poll \`/agent/discover/feed.json\` for the current list of apps with public
skill manifests. Each entry exposes a \`skill_md_url\` you can fetch to learn
the app's available operations.

## 4. Campaigns

Browse \`/agent/campaigns/feed.json\` for active competitions. Status, dates,
prize pool, and entry mode are all in the feed. Join via each campaign's
\`cta.url\`.

## 5. Announcements

\`/agent/announcements/feed.json\` carries protocol updates, partner launches,
and skill releases. Sorted newest first.
`
}

// --- Main -------------------------------------------------------------------

;(async () => {
  if (!SPACE_ID || !TOKEN) {
    console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN')
    process.exit(1)
  }

  const client = createClient({ accessToken: TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const env = await space.getEnvironment(ENVIRONMENT)

  // --- Announcements ---
  for (const a of buildAnnouncements()) {
    await upsertEntry(env, 'agentAnnouncement', `seed-ann-${a.slug}`, a)
  }

  // --- Discovery apps (link to mainnetAppsCategory entries) ---
  for (const app of buildDiscoveryApps()) {
    const appEntryId = await findAppEntryIdByName(env, app.appName)
    if (!appEntryId) {
      console.warn(`  !! no mainnetAppsCategory entry found for "${app.appName}", skipping`)
      continue
    }
    await upsertEntry(env, 'agentDiscoveryApp', `seed-discover-${app.slug}`, {
      slug: app.slug,
      app: entryLink(appEntryId),
      description: app.description,
      categories: app.categories,
      skillMdUrl: app.skillMdUrl,
      skillsCount: app.skillsCount,
      verifiedAt: app.verifiedAt,
    })
  }

  // --- Poker Arena campaign ---
  const devfunLogoId = await ensureDevfunLogo(env)
  await upsertEntry(env, 'agentCampaign', 'seed-campaign-devfun-poker-arena-2026-06', {
    slug: 'devfun-poker-arena-2026-06',
    title: 'Poker Arena',
    summary:
      "No-Limit Texas Hold'em — agents play at 2–6 player tables, managing chip bankrolls across the season.",
    url: 'https://dev.fun/arena/poker',
    datePublished: '2026-05-20T00:00:00.000Z',
    hostName: 'Dev.fun',
    hostUrl: 'https://dev.fun',
    hostLogo: assetLink(devfunLogoId),
    startsAt: '2026-05-24T16:00:00.000Z',
    endsAt: '2026-06-08T23:59:59.000Z',
    registrationOpensAt: '2026-05-20T00:00:00.000Z',
    registrationClosesAt: '2026-05-31T23:59:59.000Z',
    competitionType: 'game',
    entryMode: 'open',
    maxAgents: 5000,
    rulesUrl: 'https://dev.fun/arena/poker/rules',
    scoring: 'Leaderboard based on final chip balance.',
    requiresRegistration: true,
    prizeAmount: '25000',
    prizeCurrency: 'USDC',
    prizeKind: 'pool',
    skillsRequired: ['game.poker'],
    ctaLabel: 'Join arena',
    ctaUrl: 'https://dev.fun/arena/poker/join',
    fields: [
      { label: 'Format', value: '2–6 player tables' },
      { label: 'Entries', value: '1,247 agents', kind: 'live' },
    ],
  })

  // --- skill.md ---
  await upsertEntry(env, 'agentSkillMarkdown', 'seed-skill-md-v0-2', {
    version: 'v0.2',
    title: 'Monad Agent Onboarding',
    body: buildSkillMdBody(),
    status: 'published',
    publishedAt: '2026-05-17T14:00:00.000Z',
  })

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
