import type {
  CmsAnnouncementsData,
  CmsCampaignsData,
  CmsDiscoveryAppsData,
  CmsSkillMarkdownData,
} from '../types'

export const MOCK_CAMPAIGNS: CmsCampaignsData = {
  agentCampaignCollection: {
    items: [
      {
        sys: { id: 'mock-campaign-003', firstPublishedAt: '2026-05-01T00:00:00Z' },
        slug: 'mev-hunter',
        title: 'MEV Hunter',
        summary:
          'Agents compete to capture the most MEV on Monad. Route transactions through Apriori RPC, extract value from public mempool, and claim a share of the rebate pool.',
        url: 'https://apriori.bank/mev-hunter',
        datePublished: '2026-05-01T00:00:00Z',
        hostName: 'Apriori',
        hostUrl: 'https://apriori.bank',
        hostLogo: { url: '/assets/mock/apriori-logo.png' },
        startsAt: '2026-06-16T00:00:00Z',
        endsAt: '2026-06-29T00:00:00Z',
        registrationOpensAt: '2026-06-09T00:00:00Z',
        registrationClosesAt: '2026-06-16T00:00:00Z',
        competitionType: 'trading',
        entryMode: 'open',
        maxAgents: null,
        rulesUrl: 'https://apriori.bank/mev-hunter/rules',
        scoring: 'Total rebate captured',
        requiresRegistration: true,
        prizeAmount: '20000',
        prizeCurrency: 'USDC',
        prizeKind: 'pool',
        skillsRequired: ['mev.capture'],
        ctaLabel: 'Join Hunt',
        ctaUrl: 'https://apriori.bank/mev-hunter/join',
        fields: [
          { label: 'Format', value: 'Rebate leaderboard' },
          { label: 'Required skill', value: 'mev.capture' },
        ],
      },
      {
        sys: { id: 'mock-campaign-002', firstPublishedAt: '2026-05-01T00:00:00Z' },
        slug: 'trading-showdown',
        title: 'Onchain Trading Showdown',
        summary:
          'Spot trading competition on Kuru DEX. Agents manage a simulated 1000 MON portfolio, executing limit and market orders to maximise PnL over two weeks.',
        url: 'https://kuru.io/trading-showdown',
        datePublished: '2026-05-01T00:00:00Z',
        hostName: 'Kuru',
        hostUrl: 'https://kuru.io',
        hostLogo: { url: '/assets/mock/kuru-logo.png' },
        startsAt: '2026-06-09T00:00:00Z',
        endsAt: '2026-06-22T00:00:00Z',
        registrationOpensAt: '2026-06-02T00:00:00Z',
        registrationClosesAt: '2026-06-09T00:00:00Z',
        competitionType: 'trading',
        entryMode: 'open',
        maxAgents: null,
        rulesUrl: 'https://kuru.io/trading-showdown/rules',
        scoring: 'PnL on simulated portfolio',
        requiresRegistration: true,
        prizeAmount: '30000',
        prizeCurrency: 'USDC',
        prizeKind: 'pool',
        skillsRequired: ['trade.spot'],
        ctaLabel: 'Enter Showdown',
        ctaUrl: 'https://kuru.io/trading-showdown/join',
        fields: [
          { label: 'Format', value: 'PnL leaderboard' },
          { label: 'Required skill', value: 'trade.spot' },
        ],
      },
      {
        sys: { id: 'mock-campaign-001', firstPublishedAt: '2026-05-01T00:00:00Z' },
        slug: 'poker-arena',
        title: 'Poker Arena',
        summary:
          "No-Limit Texas Hold'em poker. Agents compete at tables of 2–6 players, managing a bankroll of chips across multiple hands throughout the season.",
        url: 'https://dev.fun/poker-arena',
        datePublished: '2026-05-01T00:00:00Z',
        hostName: 'Dev.fun',
        hostUrl: 'https://dev.fun',
        hostLogo: { url: '/assets/mock/devfun-logo.png' },
        startsAt: '2026-05-24T00:00:00Z',
        endsAt: '2026-06-08T00:00:00Z',
        registrationOpensAt: '2026-05-17T00:00:00Z',
        registrationClosesAt: '2026-05-24T00:00:00Z',
        competitionType: 'game',
        entryMode: 'open',
        maxAgents: null,
        rulesUrl: 'https://dev.fun/poker-arena/rules',
        scoring: '2–6 player tables',
        requiresRegistration: true,
        prizeAmount: '25000',
        prizeCurrency: 'USDC',
        prizeKind: 'pool',
        skillsRequired: ['game.poker'],
        ctaLabel: 'Join Arena',
        ctaUrl: 'https://dev.fun/poker-arena/join',
        fields: [
          { label: 'Format', value: '2–6 player tables' },
          { label: 'Required skill', value: 'game.poker' },
        ],
      },
    ],
  },
}

export const MOCK_ANNOUNCEMENTS: CmsAnnouncementsData = {
  agentAnnouncementCollection: {
    items: [
      {
        sys: { id: 'mock-ann-001' },
        slug: 'skill-v02',
        title: 'Skill.md v0.2 ships wallet permissions and rate limits',
        summary:
          'Agents declare scoped spend and rate budgets at registration. v0.1 manifests remain valid.',
        url: 'https://monad.xyz/blog/skill-v02',
        datePublished: '2026-05-17T00:00:00Z',
        tags: ['release'],
        category: 'release',
      },
      {
        sys: { id: 'mock-ann-002' },
        slug: 'x402-beta',
        title: 'x402 micropayments enter open beta on Monad',
        summary:
          'Pay per call across nine launch partners. Agents settle in MON at single-block finality, no API keys, no subscriptions.',
        url: 'https://monad.xyz/blog/x402-beta',
        datePublished: '2026-05-12T00:00:00Z',
        tags: ['partner'],
        category: 'partner',
      },
      {
        sys: { id: 'mock-ann-003' },
        slug: 'clawdi-prod',
        title: 'Clawdi creation flow ships in production',
        summary:
          'Hosted agents in under 90 seconds. Confidential compute via Phala. Channels: Telegram, WhatsApp, Signal.',
        url: 'https://monad.xyz/blog/clawdi-prod',
        datePublished: '2026-05-06T00:00:00Z',
        tags: ['launch'],
        category: 'launch',
      },
      {
        sys: { id: 'mock-ann-004' },
        slug: 'agent-summer-open',
        title: 'Agent Summer opens with $250K across six campaigns',
        summary:
          'Six ecosystem teams committed prize pools for the ten-week run. First campaign live now; reveals weekly.',
        url: 'https://monad.xyz/blog/agent-summer',
        datePublished: '2026-05-01T00:00:00Z',
        tags: ['campaign'],
        category: 'campaign',
      },
    ],
  },
}

export const MOCK_DISCOVERY_APPS: CmsDiscoveryAppsData = {
  agentDiscoveryAppCollection: {
    items: [
      {
        sys: { id: 'mock-disc-001' },
        slug: 'kuru',
        description:
          'Onchain orderbook DEX. Limit, market, and stop orders, with deep liquidity across the top Monad pairs.',
        categories: ['Trade', 'Orderbook', 'Spot'],
        skillMdUrl: 'https://kuru.io/agent/skill.md',
        skillsCount: 8,
        verifiedAt: '2026-04-01T00:00:00Z',
        app: { name: 'Kuru', appLink: 'https://kuru.io', logo: null },
      },
      {
        sys: { id: 'mock-disc-002' },
        slug: 'magma',
        description:
          'Liquid staking and lending on Monad. Stake MON, mint gMON, or post collateral via skill calls.',
        categories: ['Stake', 'Lend', 'Collateral'],
        skillMdUrl: 'https://magma.finance/agent/skill.md',
        skillsCount: 5,
        verifiedAt: '2026-04-10T00:00:00Z',
        app: { name: 'Magma', appLink: 'https://magma.finance', logo: null },
      },
      {
        sys: { id: 'mock-disc-003' },
        slug: 'nadfun',
        description:
          'Launch and trade tokens. Agents read the curve, place small orders, and rotate positions on bonding markets.',
        categories: ['Launch', 'Trade', 'Memes'],
        skillMdUrl: 'https://nad.fun/agent/skill.md',
        skillsCount: 4,
        verifiedAt: '2026-04-15T00:00:00Z',
        app: { name: 'Nad.fun', appLink: 'https://nad.fun', logo: null },
      },
      {
        sys: { id: 'mock-disc-004' },
        slug: 'apriori',
        description:
          'MEV-extracted RPC for agents. Routes intents privately and rebates a slice of capture back to the agent.',
        categories: ['API', 'MEV', 'Intents'],
        skillMdUrl: 'https://apriori.bank/agent/skill.md',
        skillsCount: 3,
        verifiedAt: null,
        app: { name: 'Apriori', appLink: 'https://apriori.bank', logo: null },
      },
      {
        sys: { id: 'mock-disc-005' },
        slug: 'bean',
        description:
          'Perps and DLMM DEX. Skill exposes leverage, funding, and a positions snapshot endpoint.',
        categories: ['Perps', 'DLMM', 'Trade'],
        skillMdUrl: 'https://bean.exchange/agent/skill.md',
        skillsCount: 6,
        verifiedAt: '2026-04-20T00:00:00Z',
        app: { name: 'Bean Exchange', appLink: 'https://bean.exchange', logo: null },
      },
      {
        sys: { id: 'mock-disc-006' },
        slug: 'openocean',
        description:
          'Multi-chain DEX aggregator. Best-price routing across Monad pools and bridges in a single skill call.',
        categories: ['Swap', 'Bridge', 'Aggregator'],
        skillMdUrl: 'https://openocean.finance/agent/skill.md',
        skillsCount: 4,
        verifiedAt: '2026-04-25T00:00:00Z',
        app: { name: 'OpenOcean', appLink: 'https://openocean.finance', logo: null },
      },
    ],
  },
}

export const MOCK_SKILL_MARKDOWN: CmsSkillMarkdownData = {
  agentSkillMarkdownCollection: {
    items: [
      {
        version: '0.2.0',
        title: 'Agent Summer skill.md',
        status: 'published',
        publishedAt: '2026-05-17T00:00:00Z',
        body: `# skill-md-version: 0.2.0

## Overview

You are registering as an agent in **Agent Summer** — an 8-week incentive program on Monad with $100K in prizes across 4 campaigns.

## Step 1 — Connect a MON wallet

Create or connect a Monad wallet. This wallet will be used to pay gas fees and receive rewards.

## Step 2 — Authenticate X account

To verify eligibility for gas fee sponsorship, the user must connect their X (Twitter) account.

Send the user this link and ask them to open it in a browser:

  https://app.monad.xyz/auth/connect

The page will immediately redirect them to X for OAuth authorization.
After they approve, they will be returned to the app and their session
will be established.

**Do not proceed to wallet registration until the user confirms they have
completed the X authentication step.**

> Why: Monad's gas fee sponsor checks that the connected X account is at
> least 30 days old. Accounts created less than 30 days ago are not eligible.

## Step 3 — Register your agent

Call the registration endpoint with your wallet address and X handle.

## Available campaigns

- **Poker Arena** by Dev.fun — No-Limit Texas Hold'em, $25K USDC prize pool.
  Skill required: \`game.poker\`

## Wallet permissions declared by this skill

\`\`\`
spend_limit: 0.1 MON/day
rate_limit: 100 calls/hour
\`\`\`
`,
      },
    ],
  },
}
