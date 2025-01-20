import { TechnologicalMilestonesData } from '../types/milestones'

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
      historicalPeriodId: 'first-industrial-revolution',
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
      historicalPeriodId: 'first-industrial-revolution',
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
      historicalPeriodId: 'second-industrial-revolution',
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
      historicalPeriodId: 'first-industrial-revolution',
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
        social: 'Created middle class through higher wages and affordable products',
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
      relatedMilestones: ['bessemer-process'],
      historicalPeriodId: 'second-industrial-revolution',
      sources: [
        'The Assembly Line by David Hounshell',
        'Ford: The Men and the Machine by Robert Lacey'
      ]
    },
    'transistor': {
      id: 'transistor',
      name: 'Transistor',
      year: 1947,
      category: 'Computing',
      description: 'Semiconductor device that revolutionized electronics and enabled modern computing.',
      impact: {
        economic: {
          gdpEffect: 'Enabled the entire electronics and computing industry',
          industryChanges: [
            'Electronics',
            'Computing',
            'Telecommunications'
          ],
          jobMarketImpact: 'Created new technology sector jobs and industries',
          productivityGains: 'Enabled miniaturization and increased computing power'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Development and early adoption of transistor technology',
            adoptionRate: 95,
            economicEffect: 'Led to Silicon Valley and tech industry dominance'
          },
          {
            country: 'Japan',
            description: 'Major adopter and innovator in transistor technology',
            adoptionRate: 90,
            economicEffect: 'Enabled electronics industry leadership'
          }
        ],
        social: 'Revolutionized communications and access to information',
        environmental: 'Initial concerns with semiconductor manufacturing'
      },
      keyFigures: [
        {
          name: 'William Shockley',
          role: 'Physicist',
          contribution: 'Co-invented the transistor at Bell Labs',
          dates: {
            birth: '1910',
            death: '1989'
          }
        }
      ],
      relatedMilestones: ['personal-computing'],
      historicalPeriodId: 'computing-revolution',
      sources: [
        'Crystal Fire: The Birth of the Information Age',
        'Bell Labs Technical Journal'
      ]
    },
    'personal-computing': {
      id: 'personal-computing',
      name: 'Personal Computer Revolution',
      year: 1981,
      category: 'Computing',
      description: 'Introduction of IBM PC and mass-market personal computing.',
      impact: {
        economic: {
          gdpEffect: 'Created massive new markets for hardware, software, and services',
          industryChanges: [
            'Personal Computing',
            'Software Development',
            'Office Automation'
          ],
          jobMarketImpact: 'Created software industry and IT profession',
          productivityGains: 'Revolutionized office work and personal productivity'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Center of PC revolution and software development',
            adoptionRate: 85,
            economicEffect: 'Created massive tech industry and wealth'
          },
          {
            country: 'Japan',
            description: 'Major hardware manufacturer and innovator',
            adoptionRate: 80,
            economicEffect: 'Dominated hardware manufacturing'
          }
        ],
        social: 'Democratized computing and information access',
        environmental: 'Electronic waste concerns'
      },
      keyFigures: [
        {
          name: 'Bill Gates',
          role: 'Software Pioneer',
          contribution: 'Co-founded Microsoft and popularized PC software',
          dates: {
            birth: '1955'
          }
        }
      ],
      relatedMilestones: ['transistor', 'internet'],
      historicalPeriodId: 'information-revolution',
      sources: [
        'Fire in the Valley: The Birth and Death of the Personal Computer',
        'PC Magazine Archives'
      ]
    },
    'internet': {
      id: 'internet',
      name: 'World Wide Web',
      year: 1991,
      category: 'Communication',
      description: 'Creation of the World Wide Web, enabling global information sharing.',
      impact: {
        economic: {
          gdpEffect: 'Created digital economy and e-commerce',
          industryChanges: [
            'E-commerce',
            'Digital Media',
            'Online Services'
          ],
          jobMarketImpact: 'Created vast new digital economy jobs',
          productivityGains: 'Enabled instant global communication and information access'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Led web technology and e-commerce development',
            adoptionRate: 90,
            economicEffect: 'Dominated digital economy'
          },
          {
            country: 'Europe',
            description: 'Early adoption and innovation in web technologies',
            adoptionRate: 85,
            economicEffect: 'Created significant digital market'
          }
        ],
        social: 'Transformed communication and information access',
        environmental: 'Data center energy consumption'
      },
      keyFigures: [
        {
          name: 'Tim Berners-Lee',
          role: 'Inventor',
          contribution: 'Invented the World Wide Web',
          dates: {
            birth: '1955'
          }
        }
      ],
      relatedMilestones: ['personal-computing', 'cloud-computing'],
      historicalPeriodId: 'information-revolution',
      sources: [
        'Weaving the Web by Tim Berners-Lee',
        'A Brief History of the Internet'
      ]
    },
    'cloud-computing': {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      year: 2006,
      category: 'Computing',
      description: 'Launch of AWS and the era of cloud computing services.',
      impact: {
        economic: {
          gdpEffect: 'Enabled digital transformation and new business models',
          industryChanges: [
            'Cloud Services',
            'Digital Infrastructure',
            'Enterprise Software'
          ],
          jobMarketImpact: 'Created cloud computing industry and jobs',
          productivityGains: 'Reduced IT costs and enabled scalable computing'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Led cloud computing development and adoption',
            adoptionRate: 95,
            economicEffect: 'Dominated cloud services market'
          },
          {
            country: 'China',
            description: 'Developed parallel cloud infrastructure',
            adoptionRate: 80,
            economicEffect: 'Created massive domestic cloud market'
          }
        ],
        social: 'Enabled remote work and digital services',
        environmental: 'Data center sustainability challenges'
      },
      keyFigures: [
        {
          name: 'Jeff Bezos',
          role: 'Entrepreneur',
          contribution: 'Led Amazon Web Services development',
          dates: {
            birth: '1964'
          }
        }
      ],
      relatedMilestones: ['internet', 'deep-learning'],
      historicalPeriodId: 'digital-revolution',
      sources: [
        'The Everything Store by Brad Stone',
        'AWS: How We Got Here'
      ]
    },
    'deep-learning': {
      id: 'deep-learning',
      name: 'Deep Learning Revolution',
      year: 2012,
      category: 'Computing',
      description: 'Breakthrough in neural networks enabling modern AI applications.',
      impact: {
        economic: {
          gdpEffect: 'Enabled AI industry and automation opportunities',
          industryChanges: [
            'Artificial Intelligence',
            'Machine Learning',
            'Automation'
          ],
          jobMarketImpact: 'Created AI industry and research positions',
          productivityGains: 'Enabled automation of complex tasks'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Led AI research and commercial applications',
            adoptionRate: 90,
            economicEffect: 'Created major AI industry'
          },
          {
            country: 'China',
            description: 'Major AI research and application development',
            adoptionRate: 85,
            economicEffect: 'Developed large AI market and applications'
          }
        ],
        social: 'Raised questions about AI impact on society',
        environmental: 'AI training energy consumption concerns'
      },
      keyFigures: [
        {
          name: 'Geoffrey Hinton',
          role: 'Researcher',
          contribution: 'Pioneered deep learning techniques',
          dates: {
            birth: '1947'
          }
        }
      ],
      relatedMilestones: ['cloud-computing', 'generative-ai'],
      historicalPeriodId: 'ai-revolution',
      sources: [
        'Deep Learning Revolution by Terrence J. Sejnowski',
        'ImageNet Papers and Research'
      ]
    },
    'generative-ai': {
      id: 'generative-ai',
      name: 'Generative AI',
      year: 2022,
      category: 'Computing',
      description: 'Breakthrough in large language models and generative AI capabilities.',
      impact: {
        economic: {
          gdpEffect: 'Potential to add trillions to global GDP',
          industryChanges: [
            'AI Applications',
            'Content Creation',
            'Knowledge Work'
          ],
          jobMarketImpact: 'Transforming knowledge work and creativity',
          productivityGains: 'Enabling automation of cognitive tasks'
        },
        geographic: [
          {
            country: 'United States',
            description: 'Leading generative AI development',
            adoptionRate: 80,
            economicEffect: 'Major economic potential from AI adoption'
          },
          {
            country: 'Global',
            description: 'Rapid adoption across industries',
            adoptionRate: 60,
            economicEffect: 'Widespread productivity gains expected'
          }
        ],
        social: 'Raising questions about AI ethics and future of work',
        environmental: 'Focus on efficient AI training and deployment'
      },
      keyFigures: [
        {
          name: 'Sam Altman',
          role: 'Entrepreneur',
          contribution: 'Led development of GPT models at OpenAI',
          dates: {
            birth: '1985'
          }
        }
      ],
      relatedMilestones: ['deep-learning'],
      historicalPeriodId: 'ai-revolution',
      sources: [
        'State of AI Report 2023',
        'OpenAI Technical Reports'
      ]
    }
  },
  categories: [
    'Energy',
    'Manufacturing',
    'Computing',
    'Communication',
    'Transportation',
    'Agriculture'
  ],
  timeline: [
    'spinning-jenny',
    'power-loom',
    'steam-engine',
    'bessemer-process',
    'assembly-line',
    'transistor',
    'personal-computing',
    'internet',
    'cloud-computing',
    'deep-learning',
    'generative-ai'
  ],
  metadata: {
    totalCount: 11,
    timeRange: {
      start: 1764,
      end: 2022
    },
    lastUpdated: '2024-03-20',
    version: '1.0.0'
  }
} 