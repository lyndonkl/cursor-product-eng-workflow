import { HistoricalPeriodsData } from '../types/historical';

export const historicalPeriodsData: HistoricalPeriodsData = {
  periods: {
    'pre-industrial': {
      id: 'pre-industrial',
      name: 'Pre-Industrial Era',
      startYear: 1700,
      endYear: 1760,
      description: 'Period before the Industrial Revolution, characterized by agricultural dominance and manual production methods.',
      characteristics: [
        'Agricultural economy',
        'Manual production methods',
        'Limited technological change',
        'Local trade networks',
        'Traditional social structures'
      ],
      keyEvents: [
        { year: 1701, event: 'Jethro Tull\'s seed drill', impact: 'Agricultural efficiency improvement' },
        { year: 1733, event: 'Flying shuttle invention', impact: 'Early textile innovation' },
        { year: 1750, event: 'Iron production improvements', impact: 'Metallurgy advancement' }
      ],
      regionalImpact: {
        'Western Europe': {
          summary: 'Early agricultural improvements',
          impact: 'medium',
          details: ['Agricultural innovation', 'Proto-industrialization']
        },
        'Britain': {
          summary: 'Leading agricultural revolution',
          impact: 'high',
          details: ['Enclosure movement', 'Farming techniques']
        },
        'Asia': {
          summary: 'Traditional manufacturing strength',
          impact: 'medium',
          details: ['Textile production', 'Porcelain manufacturing']
        },
        'Global': {
          summary: 'Limited international trade',
          impact: 'low',
          details: ['Maritime trade routes', 'Colonial exchanges']
        }
      },
      economicIndicators: {
        averageGrowth: '0.5-1% annual',
        keyFactors: ['Agricultural productivity', 'Trade expansion', 'Population growth'],
        peakGDPYear: 1760,
        additionalMetrics: {
          'agriculturalShare': '80%',
          'urbanization': '10%'
        }
      },
      relatedMilestones: ['seed-drill', 'flying-shuttle']
    },
    'first-industrial': {
      id: 'first-industrial',
      name: 'First Industrial Revolution',
      startYear: 1760,
      endYear: 1840,
      description: 'Period of major industrialization and mechanization, marked by steam power and new manufacturing processes.',
      characteristics: [
        'Steam power adoption',
        'Factory system emergence',
        'Mechanized production',
        'Transportation revolution',
        'Urbanization acceleration'
      ],
      keyEvents: [
        { year: 1769, event: 'Watt steam engine patent', impact: 'Power generation revolution' },
        { year: 1779, event: 'Crompton\'s Mule invention', impact: 'Textile production advance' },
        { year: 1807, event: 'First commercial steamboat', impact: 'Transportation revolution' },
        { year: 1825, event: 'First public railway', impact: 'Mass transportation begins' }
      ],
      regionalImpact: {
        'Britain': {
          summary: 'Industrial Revolution epicenter',
          impact: 'high',
          details: ['Factory system pioneer', 'Technical innovation']
        },
        'Western Europe': {
          summary: 'Industrial adoption and growth',
          impact: 'high',
          details: ['Industrial spread', 'Economic transformation']
        },
        'North America': {
          summary: 'Early industrialization',
          impact: 'medium',
          details: ['Cotton industry', 'Steam adoption']
        },
        'Global': {
          summary: 'Uneven industrial spread',
          impact: 'high',
          details: ['Colonial impact', 'Trade patterns shift']
        }
      },
      economicIndicators: {
        averageGrowth: '1.5-2% annual',
        keyFactors: ['Steam power', 'Factory production', 'Transport networks'],
        peakGDPYear: 1840,
        additionalMetrics: {
          'industrialShare': '30%',
          'urbanization': '25%'
        }
      },
      relatedMilestones: ['steam-engine', 'power-loom', 'railway']
    },
    'second-industrial': {
      id: 'second-industrial',
      name: 'Second Industrial Revolution',
      startYear: 1840,
      endYear: 1914,
      description: 'Era of rapid standardization and industrialization, featuring electricity, chemicals, and mass production.',
      characteristics: [
        'Electrical power',
        'Mass production methods',
        'Chemical industries',
        'Scientific management',
        'Global trade networks'
      ],
      keyEvents: [
        { year: 1856, event: 'Bessemer process', impact: 'Steel production revolution' },
        { year: 1879, event: 'Edison\'s light bulb', impact: 'Electrical revolution begins' },
        { year: 1885, event: 'First automobile', impact: 'Transportation transformation' },
        { year: 1903, event: 'Wright brothers flight', impact: 'Aviation age begins' }
      ],
      regionalImpact: {
        'United States': {
          summary: 'Industrial leadership emergence',
          impact: 'high',
          details: ['Mass production pioneer', 'Corporate capitalism']
        },
        'Germany': {
          summary: 'Chemical and electrical innovation',
          impact: 'high',
          details: ['Chemical industry', 'Technical education']
        },
        'Japan': {
          summary: 'Rapid industrialization',
          impact: 'high',
          details: ['Meiji restoration', 'Industrial modernization']
        },
        'Global': {
          summary: 'Industrial power shifts',
          impact: 'high',
          details: ['New industrial powers', 'Global competition']
        }
      },
      economicIndicators: {
        averageGrowth: '2.5-3% annual',
        keyFactors: ['Electricity adoption', 'Mass production', 'Chemical industry'],
        peakGDPYear: 1914,
        additionalMetrics: {
          'industrialShare': '40%',
          'electricityAccess': '30%'
        }
      },
      relatedMilestones: ['electricity', 'assembly-line', 'internal-combustion']
    },
    'post-wwii': {
      id: 'post-wwii',
      name: 'Post-WWII Boom & Early Computing',
      startYear: 1950,
      endYear: 1979,
      description: 'Period of unprecedented economic growth, technological advancement, and social change, marked by the rise of computing technology and global trade.',
      characteristics: [
        'Mass production and consumerism',
        'Rise of suburban lifestyle',
        'Early computer development',
        'Space race and technological competition',
        'Global economic cooperation'
      ],
      keyEvents: [
        { year: 1951, event: 'UNIVAC I - First commercial computer', impact: 'Began the commercial computing era' },
        { year: 1957, event: 'Sputnik launch', impact: 'Accelerated technological competition' },
        { year: 1969, event: 'ARPANET creation', impact: 'Foundation for modern internet' },
        { year: 1971, event: 'Intel 4004 microprocessor', impact: 'Enabled personal computing revolution' }
      ],
      regionalImpact: {
        'North America': {
          summary: 'Led technological innovation and economic growth',
          impact: 'high',
          details: ['Defense spending boost', 'Consumer economy growth']
        },
        'Western Europe': {
          summary: 'Rapid industrialization and economic recovery',
          impact: 'high',
          details: ['Marshall Plan impact', 'Economic integration']
        },
        'Asia': {
          summary: 'Beginning of export-oriented industrialization',
          impact: 'medium',
          details: ['Japan\'s economic miracle', 'Early Asian Tigers']
        },
        'Global': {
          summary: 'Increased international trade and cooperation',
          impact: 'high',
          details: ['Bretton Woods system', 'GATT formation']
        }
      },
      economicIndicators: {
        averageGrowth: '4-5% annual',
        keyFactors: ['Manufacturing boom', 'Technological investment', 'International trade'],
        peakGDPYear: 1973,
        additionalMetrics: {
          'manufacturingShare': '35%',
          'tradeVolume': '15% of GDP'
        }
      },
      relatedMilestones: ['transistor', 'integrated-circuit', 'mainframe-computing']
    },
    'information-age': {
      id: 'information-age',
      name: 'Information & Internet Revolution',
      startYear: 1980,
      endYear: 1999,
      description: 'Era defined by the rise of personal computing, digital communication, and the early internet, transforming business and society.',
      characteristics: [
        'Personal computer revolution',
        'Rise of software industry',
        'Early internet adoption',
        'Digital communication',
        'E-commerce beginnings'
      ],
      keyEvents: [
        { year: 1981, event: 'IBM PC release', impact: 'Standardized personal computing' },
        { year: 1991, event: 'World Wide Web launch', impact: 'Democratized information access' },
        { year: 1995, event: 'Amazon & eBay founding', impact: 'E-commerce revolution begins' },
        { year: 1998, event: 'Google founding', impact: 'Changed information discovery' }
      ],
      regionalImpact: {
        'North America': {
          summary: 'Silicon Valley emergence as tech hub',
          impact: 'high',
          details: ['Venture capital boom', 'Tech company growth']
        },
        'Europe': {
          summary: 'Digital infrastructure development',
          impact: 'medium',
          details: ['EU digital initiatives', 'Tech adoption']
        },
        'Asia': {
          summary: 'Manufacturing hub for electronics',
          impact: 'high',
          details: ['Hardware manufacturing', 'Digital infrastructure']
        },
        'Global': {
          summary: 'Digital divide emergence',
          impact: 'high',
          details: ['Internet adoption gap', 'Tech access disparity']
        }
      },
      economicIndicators: {
        averageGrowth: '3-4% annual',
        keyFactors: ['Tech sector growth', 'Digital transformation', 'Globalization'],
        peakGDPYear: 1999,
        additionalMetrics: {
          'techSectorShare': '8%',
          'internetUsers': '5% to 40%'
        }
      },
      relatedMilestones: ['personal-computing', 'internet', 'e-commerce']
    },
    'digital-revolution': {
      id: 'digital-revolution',
      name: 'Early 21st Century – AI, Big Data, & Cloud',
      startYear: 2000,
      endYear: 2019,
      description: 'Period characterized by mobile computing, social media, cloud services, and early AI applications.',
      characteristics: [
        'Mobile internet',
        'Social media emergence',
        'Cloud computing',
        'Big data analytics',
        'Early AI applications'
      ],
      keyEvents: [
        { year: 2007, event: 'iPhone launch', impact: 'Mobile computing revolution' },
        { year: 2006, event: 'AWS launch', impact: 'Cloud computing era begins' },
        { year: 2012, event: 'Deep learning breakthrough', impact: 'AI practical applications' },
        { year: 2016, event: 'AlphaGo victory', impact: 'AI capabilities milestone' }
      ],
      regionalImpact: {
        'North America': {
          summary: 'Tech platform economy dominance',
          impact: 'high',
          details: ['Platform monopolies', 'AI research leadership']
        },
        'Asia': {
          summary: 'Mobile-first digital transformation',
          impact: 'high',
          details: ['Mobile payments', 'E-commerce growth']
        },
        'Europe': {
          summary: 'Digital regulation leadership',
          impact: 'medium',
          details: ['GDPR implementation', 'Digital market rules']
        },
        'Global': {
          summary: 'Digital platform adoption',
          impact: 'high',
          details: ['Social media impact', 'Cloud services growth']
        }
      },
      economicIndicators: {
        averageGrowth: '2-3% annual',
        keyFactors: ['Platform economy', 'Mobile revolution', 'Data economy'],
        peakGDPYear: 2019,
        additionalMetrics: {
          'digitalGDPShare': '15%',
          'cloudAdoption': '60%'
        }
      },
      relatedMilestones: ['cloud-computing', 'smartphones', 'deep-learning']
    },
    'ai-revolution': {
      id: 'ai-revolution',
      name: 'AI Revolution & Future Projections',
      startYear: 2020,
      endYear: 2050,
      description: 'Current and projected era of transformative AI technologies, automation, and economic restructuring.',
      characteristics: [
        'Advanced AI systems',
        'Automation acceleration',
        'Digital transformation',
        'Sustainable technology',
        'Economic restructuring'
      ],
      keyEvents: [
        { year: 2022, event: 'ChatGPT release', impact: 'Mainstream AI adoption' },
        { year: 2023, event: 'AI regulation initiatives', impact: 'AI governance framework' },
        { year: 2025, event: 'Projected AGI developments', impact: 'Economic transformation' },
        { year: 2030, event: 'Projected quantum computing breakthrough', impact: 'Computing paradigm shift' }
      ],
      regionalImpact: {
        'Global': {
          summary: 'AI-driven economic transformation',
          impact: 'high',
          details: ['Automation impact', 'Productivity gains']
        },
        'North America': {
          summary: 'AI research and development hub',
          impact: 'high',
          details: ['AI innovation', 'Tech leadership']
        },
        'Asia': {
          summary: 'AI manufacturing and implementation',
          impact: 'high',
          details: ['AI adoption', 'Manufacturing automation']
        },
        'Europe': {
          summary: 'AI ethics and regulation center',
          impact: 'medium',
          details: ['AI governance', 'Ethical frameworks']
        }
      },
      economicIndicators: {
        averageGrowth: '3-5% annual',
        keyFactors: ['AI productivity gains', 'Automation benefits', 'Innovation acceleration'],
        peakGDPYear: 2050,
        additionalMetrics: {
          'aiMarketSize': '15.7T',
          'automationRate': '45%'
        }
      },
      relatedMilestones: ['generative-ai', 'quantum-computing', 'brain-computer-interface']
    }
  },
  timeline: ['pre-industrial', 'first-industrial', 'second-industrial', 'post-wwii', 'information-age', 'digital-revolution', 'ai-revolution'],
  metadata: {
    totalPeriods: 7,
    timeRange: { start: 1700, end: 2050 },
    lastUpdated: '2024-03-20',
    version: '2.0.0'
  }
}; 