import { TechnologicalMilestonesData } from '../../types/milestones'

export const technologicalMilestonesData: TechnologicalMilestonesData = {
  milestones: {
    'steam-engine': {
      id: 'steam-engine',
      name: 'Watt Steam Engine',
      year: 1769,
      category: 'Energy',
      description: 'Improved steam engine with separate condenser, marking a crucial development in the First Industrial Revolution.',
      impact: {
        economic: {
          gdpEffect: 'Significant increase in industrial productivity and manufacturing capabilities',
          industryChanges: [
            'Manufacturing',
            'Mining',
            'Transportation'
          ],
          jobMarketImpact: 'Created new industrial jobs while transforming traditional manufacturing roles',
          productivityGains: 'Enabled continuous mechanical power generation, increasing factory output by orders of magnitude'
        },
        geographic: [
          {
            country: 'United Kingdom',
            description: 'Epicenter of steam engine adoption and industrial transformation',
            adoptionRate: 85,
            economicEffect: 'Dramatic increase in manufacturing capacity and economic output'
          },
          {
            country: 'United States',
            description: 'Rapid adoption in manufacturing and transportation sectors',
            adoptionRate: 60,
            economicEffect: 'Accelerated industrialization and economic growth'
          }
        ],
        social: 'Transformed working patterns and urbanization',
        environmental: 'Increased coal consumption and urban pollution'
      },
      keyFigures: [
        {
          name: 'James Watt',
          role: 'Inventor',
          contribution: 'Developed the separate condenser and steam engine improvements',
          dates: {
            birth: '1736',
            death: '1819'
          }
        }
      ],
      relatedMilestones: ['spinning-jenny', 'bessemer-process'],
      historicalPeriodId: 'first-industrial',
      sources: [
        'Science Museum Group Collection',
        'The First Industrial Revolution by P. Mathias'
      ]
    },
    'spinning-jenny': {
      id: 'spinning-jenny',
      name: 'Spinning Jenny',
      year: 1764,
      category: 'Manufacturing',
      description: 'Multi-spindle spinning frame that revolutionized textile production.',
      impact: {
        economic: {
          gdpEffect: 'Dramatic increase in textile production efficiency and output',
          industryChanges: [
            'Textile Manufacturing',
            'Cotton Processing',
            'Clothing Production'
          ],
          jobMarketImpact: 'Transformed textile industry employment while increasing productivity',
          productivityGains: 'Enabled one worker to operate multiple spindles simultaneously'
        },
        geographic: [
          {
            country: 'United Kingdom',
            description: 'Revolutionary impact on British textile industry',
            adoptionRate: 90,
            economicEffect: 'Established Britain as the world leader in textile production'
          },
          {
            country: 'France',
            description: 'Gradual adoption in textile manufacturing regions',
            adoptionRate: 45,
            economicEffect: 'Modernized textile production capabilities'
          }
        ],
        social: 'Changed labor patterns in textile industry',
        environmental: 'Increased demand for raw cotton and wool'
      },
      keyFigures: [
        {
          name: 'James Hargreaves',
          role: 'Inventor',
          contribution: 'Invented and developed the Spinning Jenny',
          dates: {
            birth: '1720',
            death: '1778'
          }
        }
      ],
      relatedMilestones: ['steam-engine', 'power-loom'],
      historicalPeriodId: 'first-industrial',
      sources: [
        'The Industrial Revolution by Pat Hudson',
        'British Textile Technology in the Eighteenth Century'
      ]
    },
    'bessemer-process': {
      id: 'bessemer-process',
      name: 'Bessemer Process',
      year: 1856,
      category: 'Manufacturing',
      description: 'First inexpensive industrial process for mass-producing steel from molten pig iron.',
      impact: {
        economic: {
          gdpEffect: 'Revolutionary impact on steel production costs and availability',
          industryChanges: [
            'Steel Manufacturing',
            'Construction',
            'Railroad Development',
            'Shipbuilding'
          ],
          jobMarketImpact: 'Created new jobs in steel industry while requiring more skilled labor',
          productivityGains: 'Reduced steel production time from weeks to minutes'
        },
        geographic: [
          {
            country: 'United Kingdom',
            description: 'Initial development and implementation',
            adoptionRate: 75,
            economicEffect: 'Transformed steel industry and enabled infrastructure growth'
          },
          {
            country: 'United States',
            description: 'Rapid adoption leading to industrial expansion',
            adoptionRate: 85,
            economicEffect: 'Enabled railroad expansion and industrial growth'
          },
          {
            country: 'Germany',
            description: 'Significant adoption in developing industrial regions',
            adoptionRate: 70,
            economicEffect: 'Accelerated industrial development'
          }
        ],
        social: 'Enabled modern urban development and infrastructure',
        environmental: 'Increased iron ore mining and coal consumption'
      },
      keyFigures: [
        {
          name: 'Henry Bessemer',
          role: 'Inventor',
          contribution: 'Developed the Bessemer Process for steel production',
          dates: {
            birth: '1813',
            death: '1898'
          }
        }
      ],
      relatedMilestones: ['steam-engine', 'rail-transport'],
      historicalPeriodId: 'second-industrial',
      sources: [
        'The Age of Steel by Kenneth Warren',
        'Industrial Revolution Documentation Project'
      ]
    },
    'power-loom': {
      id: 'power-loom',
      name: 'Power Loom',
      year: 1785,
      category: 'Manufacturing',
      description: 'Mechanized weaving machine that revolutionized textile production, building upon earlier innovations.',
      impact: {
        economic: {
          gdpEffect: 'Dramatic increase in textile production output and efficiency',
          industryChanges: [
            'Textile Manufacturing',
            'Cotton Processing',
            'Industrial Automation'
          ],
          jobMarketImpact: 'Transformed weaving industry, leading to increased factory employment',
          productivityGains: 'Increased weaving speed and output by orders of magnitude'
        },
        geographic: [
          {
            country: 'United Kingdom',
            description: 'Epicenter of power loom adoption and textile industry growth',
            adoptionRate: 85,
            economicEffect: 'Cemented Britain\'s dominance in textile manufacturing'
          },
          {
            country: 'United States',
            description: 'Rapid adoption in New England textile mills',
            adoptionRate: 70,
            economicEffect: 'Spurred industrial growth in northeastern United States'
          }
        ],
        social: 'Changed labor dynamics in textile industry, led to factory system',
        environmental: 'Increased demand for cotton and water power'
      },
      keyFigures: [
        {
          name: 'Edmund Cartwright',
          role: 'Inventor',
          contribution: 'Invented and patented the power loom',
          dates: {
            birth: '1743',
            death: '1823'
          }
        }
      ],
      relatedMilestones: ['spinning-jenny', 'steam-engine'],
      historicalPeriodId: 'first-industrial',
      sources: [
        'The First Industrial Revolution by P. Mathias',
        'British Textile Technology in the Eighteenth Century'
      ]
    },
    'assembly-line': {
      id: 'assembly-line',
      name: 'Assembly Line Production',
      year: 1913,
      category: 'Manufacturing',
      description: 'Revolutionary manufacturing process that standardized mass production, pioneered by Henry Ford.',
      impact: {
        economic: {
          gdpEffect: 'Dramatic reduction in production costs and increase in manufacturing efficiency',
          industryChanges: [
            'Automotive Manufacturing',
            'Consumer Goods',
            'Industrial Processes'
          ],
          jobMarketImpact: 'Created standardized factory jobs, increased wages',
          productivityGains: 'Reduced Model T production time from 12 hours to 2.5 hours'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Birthplace of modern assembly line production',
            adoptionRate: 90,
            economicEffect: 'Revolutionized manufacturing and enabled mass consumption'
          },
          {
            country: 'Germany',
            description: 'Early adopter of assembly line techniques',
            adoptionRate: 75,
            economicEffect: 'Enhanced industrial efficiency and output'
          }
        ],
        social: 'Transformed factory work and enabled mass consumption society',
        environmental: 'Increased resource consumption and industrial waste'
      },
      keyFigures: [
        {
          name: 'Henry Ford',
          role: 'Industrialist',
          contribution: 'Pioneered modern assembly line production',
          dates: {
            birth: '1863',
            death: '1947'
          }
        }
      ],
      relatedMilestones: ['internal-combustion', 'mass-production'],
      historicalPeriodId: 'second-industrial',
      sources: [
        'The Ford Century by Russ Banham',
        'Mass Production, the Stock Market Crash, and the Great Depression'
      ]
    }
  },
  categories: ['Energy', 'Manufacturing', 'Transportation'],
  timeline: ['spinning-jenny', 'steam-engine', 'power-loom', 'bessemer-process', 'assembly-line'],
  metadata: {
    totalCount: 5,
    timeRange: {
      start: 1764,
      end: 1913
    },
    lastUpdated: '2024-03-20',
    version: '1.0.0'
  }
} 