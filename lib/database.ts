// Mock database for questions and tracking

// Types
export interface Question {
  id: string
  title: string
  content: string
  sources: string[]
  lastUpdated: string
  isUpdated: boolean
}

export interface TrackedQuestion {
  id: string
  title: string
  lastChecked: string
  lastUpdated: string
  isUpdated: boolean
}

// Mock data for questions
export const questions: Question[] = [
  {
    id: "l2-war",
    title: "What's the latest in the L2 war?",
    content: `The L2 ecosystem continues to evolve rapidly with several key developments in the past 24 hours:
    
    • Base has seen a 15% increase in TVL, now reaching $2.4B
    • Optimism announced a new partnership with a major DeFi protocol
    • Arbitrum's transaction volume surpassed 2M daily transactions
    • ZkSync Era launched a new developer incentive program worth $10M`,
    sources: [
      "DefiLlama TVL Reports - March 13, 2025",
      "Optimism Official Blog Announcement",
      "Arbitrum Network Stats Dashboard",
      "ZkSync Era Developer Portal",
    ],
    lastUpdated: "2025-03-13T14:30:00Z",
    isUpdated: true,
  },
  {
    id: "eth-tvl",
    title: "How is Ethereum's TVL changing?",
    content: `Ethereum's TVL has shown significant movement in the last week:
    
    • Overall TVL increased by 8.3% to reach $48.7B
    • DeFi protocols account for 62% of the total TVL
    • Lending protocols saw the highest growth at 12.4%
    • New L2 bridges have contributed to $1.2B in additional TVL`,
    sources: ["DeFi Pulse Weekly Report", "Ethereum Foundation Metrics", "DappRadar Analytics Dashboard"],
    lastUpdated: "2025-03-12T09:15:00Z",
    isUpdated: true,
  },
  {
    id: "solana-growth",
    title: "Track Solana ecosystem growth",
    content: `The Solana ecosystem continues to expand with several notable developments:
    
    • Daily active addresses increased by 22% month-over-month
    • NFT volume reached $142M in the past week
    • Three major DeFi protocols launched on Solana in the past 10 days
    • Developer activity increased with 17% more GitHub commits`,
    sources: ["Solana Beach Analytics", "Solana Foundation Report", "Magic Eden Market Data"],
    lastUpdated: "2025-03-10T16:45:00Z",
    isUpdated: false,
  },
  {
    id: "base-optimism",
    title: "Compare Base vs Optimism growth metrics",
    content: `Comparing the growth metrics between Base and Optimism:
    
    • Base: $2.4B TVL, 1.8M daily transactions, 320k daily active addresses
    • Optimism: $3.1B TVL, 2.2M daily transactions, 380k daily active addresses
    • Base is growing 18% faster month-over-month
    • Optimism has 42% more protocols deployed`,
    sources: ["L2Beat Comparison Data", "Base Network Statistics", "Optimism Ecosystem Report"],
    lastUpdated: "2025-03-11T11:20:00Z",
    isUpdated: true,
  },
]

// Initial tracked questions
export const initialTrackedQuestions: TrackedQuestion[] = [
  {
    id: "l2-war",
    title: "What's the latest in the L2 war?",
    lastChecked: "2025-03-13T14:30:00Z",
    lastUpdated: "2025-03-13T14:30:00Z",
    isUpdated: true,
  },
  {
    id: "eth-tvl",
    title: "How is Ethereum's TVL changing?",
    lastChecked: "2025-03-13T14:30:00Z",
    lastUpdated: "2025-03-12T09:15:00Z",
    isUpdated: true,
  },
  {
    id: "solana-growth",
    title: "Track Solana ecosystem growth",
    lastChecked: "2025-03-13T14:30:00Z",
    lastUpdated: "2025-03-10T16:45:00Z",
    isUpdated: false,
  },
]

// Helper functions to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHrs < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60))
    return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
  } else if (diffHrs < 24) {
    return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""} ago`
  } else {
    const diffDays = Math.floor(diffHrs / 24)
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
  }
}

