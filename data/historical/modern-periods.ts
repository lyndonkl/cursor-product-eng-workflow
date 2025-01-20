import { HistoricalPeriod } from '../types/historical';

export const modernPeriods: HistoricalPeriod[] = [
  {
    name: "Post-WWII Boom & Early Computing",
    startYear: 1950,
    endYear: 1979,
    keyLocations: [
      {
        country: "United States",
        description: "Dominant industrial and technological power post-WWII",
        economicFocus: ["Computing", "Automotive", "Consumer Goods"],
        developments: ["Silicon Valley beginnings", "Space Race"]
      },
      {
        country: "Western Europe",
        description: "Rapid rebuilding under the Marshall Plan",
        economicFocus: ["Manufacturing", "Infrastructure"],
        developments: [
          "Germany's Wirtschaftswunder",
          "France's Trente Glorieuses"
        ]
      },
      {
        country: "Japan",
        description: "Post-war economic miracle",
        economicFocus: ["Electronics", "Automotive"],
        developments: ["Major player in electronics and automotive"]
      }
    ],
    dynamics: {
      economy: [
        "Mass consumerism",
        "Assembly-line efficiency",
        "Global trade expansion"
      ],
      society: [
        "Rising middle class",
        "Suburban expansion",
        "Consumer culture"
      ],
      technology: [
        "Transistors and early mainframes",
        "Nuclear energy research",
        "Early network technology (ARPANET)"
      ]
    },
    context: {
      talkingPoints: [
        "Cold War competition driving innovation",
        "Rise of consumer society"
      ],
      keyIndustries: ["Computing", "Automotive", "Consumer Appliances", "Nuclear"],
      breakthroughs: [
        {
          name: "Transistor",
          year: 1947,
          description: "Bell Labs invention revolutionizing electronics"
        },
        {
          name: "ARPANET",
          year: 1969,
          description: "Precursor to the modern internet"
        }
      ]
    }
  },
  {
    name: "Information/Internet Revolution",
    startYear: 1980,
    endYear: 2000,
    keyLocations: [
      {
        country: "United States",
        description: "Silicon Valley leading tech innovation",
        economicFocus: ["Software", "Personal Computing", "Internet"],
        developments: ["Apple, Microsoft, Intel pioneering technology"]
      },
      {
        country: "Asia's Four Tigers",
        description: "Tech manufacturing powerhouses",
        economicFocus: ["Electronics Manufacturing", "Export"],
        developments: ["South Korea, Taiwan, Singapore, Hong Kong rapid growth"]
      },
      {
        country: "Europe",
        description: "Software and telecom innovation",
        economicFocus: ["Software", "Telecommunications"],
        developments: ["Nordic region, UK, Germany leading in mobile and software"]
      }
    ],
    dynamics: {
      economy: [
        "Rise of tech companies",
        "Dot-com boom",
        "Globalization acceleration"
      ],
      society: [
        "Digital revolution",
        "Internet adoption",
        "Mobile communication"
      ],
      technology: [
        "Personal computers",
        "World Wide Web",
        "Mobile phones"
      ]
    },
    context: {
      talkingPoints: [
        "Dot-com era speculation and growth",
        "Globalization and WTO formation"
      ],
      keyIndustries: ["Personal Computing", "Internet", "Mobile Phones"],
      breakthroughs: [
        {
          name: "World Wide Web",
          year: 1989,
          description: "Tim Berners-Lee's invention at CERN"
        },
        {
          name: "Commercial Internet",
          description: "Mosaic/Netscape browsers enabling mass adoption"
        }
      ]
    }
  },
  {
    name: "AI & Cloud Era",
    startYear: 2000,
    endYear: 2020,
    keyLocations: [
      {
        country: "United States",
        description: "Dominant in software, cloud, and big data",
        economicFocus: ["Cloud Computing", "AI", "Social Media"],
        developments: ["AWS, Azure, GCP cloud platforms"]
      },
      {
        country: "China",
        description: "Emerging tech superpower",
        economicFocus: ["AI", "Mobile Apps", "E-commerce"],
        developments: ["Huge state-led AI and tech programs"]
      },
      {
        country: "India",
        description: "Global IT services hub",
        economicFocus: ["IT Services", "Startups"],
        developments: ["Growing startup ecosystem", "Mobile app growth"]
      }
    ],
    dynamics: {
      economy: [
        "Platform economies",
        "Digital transformation",
        "Mobile-first services"
      ],
      society: [
        "Social media revolution",
        "Smartphone ubiquity",
        "Remote work emergence"
      ],
      technology: [
        "Deep learning breakthroughs",
        "Cloud computing",
        "Mobile internet"
      ]
    },
    context: {
      talkingPoints: [
        "Rise of platform economies",
        "Data-driven decision making"
      ],
      keyIndustries: ["Cloud Computing", "AI/ML", "Social Media", "E-commerce"],
      breakthroughs: [
        {
          name: "Deep Learning Renaissance",
          year: 2012,
          description: "ImageNet success launching modern AI era"
        },
        {
          name: "Cloud Computing",
          year: 2006,
          description: "AWS launching cloud computing era"
        }
      ]
    }
  },
  {
    name: "AI Revolution & Future",
    startYear: 2020,
    endYear: 2050,
    keyLocations: [
      {
        country: "United States",
        description: "Leading in advanced AI",
        economicFocus: ["AI", "Quantum Computing"],
        developments: ["OpenAI, Google DeepMind breakthroughs"]
      },
      {
        country: "China",
        description: "AI and robotics powerhouse",
        economicFocus: ["AI", "Robotics"],
        developments: ["Robust AI initiatives", "Shenzhen hardware hub"]
      },
      {
        country: "Europe",
        description: "AI governance leadership",
        economicFocus: ["AI Ethics", "Robotics"],
        developments: ["AI regulation", "Ethical frameworks"]
      }
    ],
    dynamics: {
      economy: [
        "AI-driven automation",
        "Sustainable tech",
        "Digital transformation"
      ],
      society: [
        "AI integration in daily life",
        "Workforce transformation",
        "Privacy concerns"
      ],
      technology: [
        "Generative AI",
        "Quantum computing",
        "Advanced robotics"
      ]
    },
    context: {
      talkingPoints: [
        "AI adding estimated $15.7T to global economy by 2030",
        "Balance of innovation and ethical concerns"
      ],
      keyIndustries: ["AI", "Robotics", "Quantum Computing", "Biotech"],
      breakthroughs: [
        {
          name: "Large Language Models",
          description: "Transforming human-computer interaction"
        },
        {
          name: "Quantum Supremacy",
          description: "Potential breakthrough in computing"
        }
      ]
    }
  }
]; 