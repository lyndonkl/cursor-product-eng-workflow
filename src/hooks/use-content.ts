import { useState, useEffect } from 'react'
import type { 
  ContentType,
  PeriodContent,
  MilestoneContent,
  EconomicImpactContent,
  RegionalImpactContent
} from '../types/content'
import { contentService } from '../lib/content-service'

interface UseContentOptions {
  id?: string
  periodId?: string
  milestoneId?: string
  region?: string
  type?: 'period' | 'milestone' | 'economic' | 'regional'
}

interface UseContentReturn {
  content: ContentType | ContentType[] | null
  relatedContent: ContentType[]
  isLoading: boolean
  error: Error | null
}

export function useContent({
  id,
  periodId,
  milestoneId,
  region,
  type
}: UseContentOptions = {}): UseContentReturn {
  const [content, setContent] = useState<ContentType | ContentType[] | null>(null)
  const [relatedContent, setRelatedContent] = useState<ContentType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setIsLoading(true)
        let result: ContentType | ContentType[] | null = null

        // Fetch specific content by ID
        if (id) {
          result = await contentService.getContent(id)
          if (result) {
            const related = await contentService.getRelatedContent(id)
            setRelatedContent(related)
          }
        }
        // Fetch content by type and additional parameters
        else if (type) {
          switch (type) {
            case 'period':
              if (periodId) {
                result = await contentService.getPeriodContent(periodId)
              }
              break
            case 'milestone':
              if (milestoneId) {
                result = await contentService.getMilestoneContent(milestoneId)
              }
              break
            case 'economic':
              result = await contentService.getEconomicImpactContent()
              break
            case 'regional':
              if (region) {
                result = await contentService.getRegionalImpactContent(region)
              }
              break
          }
        }

        setContent(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch content'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [id, periodId, milestoneId, region, type])

  return {
    content,
    relatedContent,
    isLoading,
    error
  }
} 