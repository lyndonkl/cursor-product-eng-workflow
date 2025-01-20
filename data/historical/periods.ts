import { HistoricalPeriod } from '../types/historical';

export const historicalPeriods: HistoricalPeriod[] = [
  {
    name: "Pre-Industrial Era",
    startYear: 1700,
    endYear: 1780,
    keyLocations: [
      {
        country: "China",
        description: "One of the largest global economies by total GDP, but agrarian-based",
        economicFocus: ["Agriculture", "Textiles"]
      },
      {
        country: "Mughal India",
        description: "Major textile producer (cotton, silk), also agrarian-focused",
        economicFocus: ["Textiles", "Agriculture"]
      },
      {
        country: "Europe",
        description: "Growing maritime powers; expanding colonial trade",
        economicFocus: ["Maritime Trade", "Colonial Expansion"],
        developments: ["France and Great Britain emerging as major powers"]
      }
    ],
    dynamics: {
      economy: [
        "Primarily agrarian societies",
        "Limited mechanization",
        "Coal usage minimal, mostly for heating"
      ],
      society: [
        "Slower population growth",
        "Subsistence living",
        "Higher mortality rates"
      ],
      technology: [
        "Primitive steam engines",
        "Basic coal usage",
        "Limited mechanization"
      ]
    },
    context: {
      talkingPoints: [
        "Colonial trade routes shaping early wealth distribution",
        "Comparisons of agrarian vs. proto-industrial economies"
      ]
    }
  },
  {
    name: "First Industrial Revolution",
    startYear: 1780,
    endYear: 1850,
    keyLocations: [
      {
        country: "Great Britain",
        description: "Epicenter of industrialization",
        economicFocus: ["Coal", "Iron", "Textiles"],
        developments: ["Manchester and Birmingham emerging as factory towns"]
      },
      {
        country: "France & Western Europe",
        description: "Adopting mechanized production but lagging behind Britain initially",
        economicFocus: ["Manufacturing", "Textiles"]
      },
      {
        country: "United States",
        description: "Northeast industrial hubs",
        economicFocus: ["Textiles", "Small Manufacturing"]
      }
    ],
    dynamics: {
      economy: [
        "Rise of factory system",
        "Mechanization of textile production",
        "Growth of industrial cities"
      ],
      society: [
        "Emergence of working class",
        "Labor movements",
        "Urbanization"
      ],
      technology: [
        "Steam engine improvements",
        "Mechanized textile mills",
        "Early railways and canals"
      ]
    },
    context: {
      talkingPoints: [
        "Urbanization and the rise of factory towns",
        "Social changes and labor movements"
      ],
      keyIndustries: ["Textiles", "Iron", "Coal", "Steam Power"],
      breakthroughs: [
        {
          name: "Watt Steam Engine",
          year: 1770,
          description: "Improved efficiency and industrial applications"
        },
        {
          name: "Spinning Jenny",
          description: "Revolutionized textile production"
        }
      ]
    }
  },
  {
    name: "Second Industrial Revolution",
    startYear: 1870,
    endYear: 1914,
    keyLocations: [
      {
        country: "United States",
        description: "Overtaking the UK in steel and industrial output",
        economicFocus: ["Steel", "Mass Production"],
        developments: ["Rise of corporations", "Assembly line production"]
      },
      {
        country: "Germany",
        description: "Rapid industrialization and technological advancement",
        economicFocus: ["Chemicals", "Steel", "Electrical Equipment"]
      },
      {
        country: "Japan",
        description: "Rapid modernization through Meiji Restoration",
        economicFocus: ["Industry", "Military Modernization"],
        developments: ["Meiji Restoration ~1868"]
      }
    ],
    dynamics: {
      economy: [
        "Mass production techniques",
        "Rise of corporations",
        "Global trade expansion"
      ],
      society: [
        "Growing middle class",
        "Urbanization acceleration",
        "Complex financial systems"
      ],
      technology: [
        "Electricity and electric motors",
        "Internal combustion engine",
        "Chemical synthesis"
      ]
    },
    context: {
      talkingPoints: [
        "Global trade expansion through steamships and telegraphs",
        "Rise of consumer goods and middle class"
      ],
      keyIndustries: ["Steel", "Electricity", "Chemicals", "Transportation"],
      breakthroughs: [
        {
          name: "Bessemer Process",
          description: "Revolutionary steel production method"
        },
        {
          name: "Assembly Line",
          year: 1913,
          description: "Henry Ford's innovation in mass production"
        }
      ]
    }
  }
];

export const statistics = {
  countryGDP: [
    {
      country: "UK",
      year: 1820,
      metric: "Global GDP Share",
      value: "2% but highest per-capita industrial output"
    },
    {
      country: "Japan",
      year: 1980,
      metric: "Global Position",
      value: "World's second-largest economy"
    },
    {
      country: "China & US",
      year: 2020,
      metric: "Global GDP Share",
      value: "~40% (PPP)"
    }
  ],
  population: [
    {
      year: 1800,
      value: "~1 billion"
    },
    {
      year: 2020,
      value: "~7.8 billion"
    }
  ],
  productivity: [
    {
      description: "Steam engines impact",
      impact: "Dramatic reduction in manual labor needs"
    },
    {
      description: "Assembly lines",
      impact: "Production costs cut by ~60%"
    }
  ],
  trade: [
    {
      description: "19th-century rail/steamships vs. 21st-century container shipping and digital networks"
    },
    {
      description: "Global internet usage",
      metric: "~16 million (1995) to ~4.7 billion (2020)"
    }
  ]
};

export const additionalInsights = {
  humanDevelopment: [
    "Rising life expectancy, literacy rates, and overall living standards often parallel each industrial revolution"
  ],
  environment: [
    "Industrialization historically tied to CO₂ emissions",
    "Future growth must balance sustainability"
  ],
  policyGovernance: [
    "Intellectual property rights, trade agreements, research funding can accelerate (or slow) tech adoption"
  ],
  culturalImpacts: [
    "Rapid industrial/tech changes reshape lifestyles, consumer habits, and norms (telephone, social media, AI chatbots)"
  ]
}; 