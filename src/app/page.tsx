'use client'

import { Suspense } from 'react'
import { TimelineOverview } from '@/components/timeline/timeline-overview'
import { ScrollContainer } from '@/components/scroll/scroll-container'
import { Section } from '@/components/scroll/section'
import { cn } from '@/lib/utils'

const sections = [
  {
    title: "The First Industrial Revolution",
    subtitle: "1760-1840",
    content: (
      <div className="space-y-4">
        <p>
          The First Industrial Revolution marked a major turning point in human history. 
          It began in Britain in the late 18th century and spread to other parts of the world.
        </p>
        <p>
          This period saw the transition from manual production methods to machine manufacturing,
          increased use of steam power, and the development of machine tools.
        </p>
      </div>
    ),
    image: "/images/first-industrial-revolution.jpg"
  },
  {
    title: "The Second Industrial Revolution",
    subtitle: "1870-1914",
    content: (
      <div className="space-y-4">
        <p>
          The Second Industrial Revolution, also known as the Technological Revolution,
          was a phase of rapid standardization and industrialization.
        </p>
        <p>
          This period saw the widespread adoption of electricity, petroleum, and steel.
          Mass production techniques and the assembly line transformed manufacturing.
        </p>
      </div>
    ),
    image: "/images/second-industrial-revolution.jpg"
  },
  {
    title: "The Digital Revolution",
    subtitle: "1950-2000",
    content: (
      <div className="space-y-4">
        <p>
          The Digital Revolution, also known as the Third Industrial Revolution,
          marked the shift from mechanical and analog electronic technology to digital electronics.
        </p>
        <p>
          This era saw the rise of personal computers, the internet, and digital communication,
          fundamentally changing how we live and work.
        </p>
      </div>
    ),
    image: "/images/digital-revolution.jpg"
  },
  {
    title: "The Fourth Industrial Revolution",
    subtitle: "2000-Present",
    content: (
      <div className="space-y-4">
        <p>
          The Fourth Industrial Revolution represents the current trend of automation
          and data exchange in manufacturing technologies.
        </p>
        <p>
          This includes artificial intelligence, robotics, the Internet of Things (IoT),
          quantum computing, and other emerging technologies that blur the lines between
          physical, digital, and biological spheres.
        </p>
      </div>
    ),
    image: "/images/fourth-industrial-revolution.jpg"
  }
]

export default function Home() {
  return (
    <main className="relative">
      <ScrollContainer>
        <div className="w-full h-full">
          <Suspense fallback={<div>Loading...</div>}>
            <TimelineOverview />
          </Suspense>
        </div>
        {sections.map((section, index) => (
          <Suspense 
            key={section.title}
            fallback={
              <Section
                {...section}
                isLoading={true}
              />
            }
          >
            <Section
              {...section}
              className={cn(
                'transition-opacity duration-500',
                index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'
              )}
            />
          </Suspense>
        ))}
      </ScrollContainer>
    </main>
  )
}
