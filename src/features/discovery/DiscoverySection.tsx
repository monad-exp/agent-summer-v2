import { SectionFrame } from '../../components/SectionFrame'
import type { DiscoveryCard as DiscoveryCardType } from '../../types/discovery'
import { DiscoveryCard } from './DiscoveryCard'

const CARDS: DiscoveryCardType[] = [
  {
    id: 'kuru',
    name: 'Kuru',
    handle: 'kuru.io',
    description: 'Onchain orderbook DEX. Limit, market, and stop orders, with deep liquidity across the top Monad pairs.',
    tags: ['Trade', 'Orderbook', 'Spot'],
    version: 'v1.4.2',
    thumbKey: 'kuru',
  },
  {
    id: 'magma',
    name: 'Magma',
    handle: 'magma.finance',
    description: 'Liquid staking and lending on Monad. Stake MON, mint gMON, or post collateral via skill calls.',
    tags: ['Stake', 'Lend', 'Collateral'],
    version: 'v0.9.1',
    thumbKey: 'magma',
  },
  {
    id: 'nadfun',
    name: 'Nad.fun',
    handle: 'nad.fun',
    description: 'Launch and trade tokens. Agents read the curve, place small orders, and rotate positions on bonding markets.',
    tags: ['Launch', 'Trade', 'Memes'],
    version: 'v0.6.0',
    thumbKey: 'nadfun',
  },
  {
    id: 'apriori',
    name: 'Apriori',
    handle: 'apriori.bank',
    description: 'MEV-extracted RPC for agents. Routes intents privately and rebates a slice of capture back to the agent.',
    tags: ['API', 'MEV', 'Intents'],
    version: 'v0.4.3',
    thumbKey: 'apriori',
  },
  {
    id: 'bean',
    name: 'Bean Exchange',
    handle: 'bean.exchange',
    description: 'Perps and DLMM DEX. Skill exposes leverage, funding, and a positions snapshot endpoint.',
    tags: ['Perps', 'DLMM', 'Trade'],
    version: 'v1.0.0',
    thumbKey: 'bean',
  },
  {
    id: 'openocean',
    name: 'OpenOcean',
    handle: 'openocean.finance',
    description: 'Multi-chain DEX aggregator. Best-price routing across Monad pools and bridges in a single skill call.',
    tags: ['Swap', 'Bridge', 'Aggregator'],
    version: 'v0.7.5',
    thumbKey: 'openocean',
  },
]

export function DiscoverySection() {
  return (
    <section className="disc" data-screen-label="04 Discovery">
      <SectionFrame>
        <div className="sec-head">
          <div className="sec-head__left">
            <div className="sec-head__eyebrow">Discovery</div>
            <h2 className="sec-head__title">dApps your agent can use.</h2>
            <p className="sec-head__desc">
              Monad apps that publish a machine-readable skill manifest. Your agent polls for new
              ones automatically.
            </p>
          </div>
          <span className="sec-head__meta">
            <span className="sec-head__meta-dot" />
            <span>
              <strong>{CARDS.length}</strong>manifests indexed
            </span>
          </span>
        </div>

        <div className="disc__grid">
          {CARDS.map((card) => (
            <DiscoveryCard key={card.id} card={card} />
          ))}
        </div>
      </SectionFrame>
    </section>
  )
}
