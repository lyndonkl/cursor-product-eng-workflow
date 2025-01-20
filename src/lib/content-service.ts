import type {
  ContentType,
  PeriodContent,
  MilestoneContent,
  EconomicImpactContent,
  RegionalImpactContent,
  ContentValidationResult
} from '../types/content'
import { validateContent } from './content-validation'

class ContentService {
  private contentStore: Map<string, ContentType>
  private contentRelations: Map<string, Set<string>>

  constructor() {
    this.contentStore = new Map()
    this.contentRelations = new Map()
  }

  async addContent(content: ContentType): Promise<ContentValidationResult> {
    // Validate content before adding
    const validationResult = validateContent(content)
    if (!validationResult.isValid) {
      return validationResult
    }

    // Store content
    this.contentStore.set(content.id, content)

    // Create relationships
    if ('relatedPeriods' in content) {
      content.relatedPeriods.forEach(periodId => {
        this.addRelation(content.id, periodId)
      })
    }

    return validationResult
  }

  private addRelation(sourceId: string, targetId: string) {
    if (!this.contentRelations.has(sourceId)) {
      this.contentRelations.set(sourceId, new Set())
    }
    this.contentRelations.get(sourceId)?.add(targetId)
  }

  async getContent(id: string): Promise<ContentType | null> {
    return this.contentStore.get(id) || null
  }

  async getPeriodContent(periodId: string): Promise<PeriodContent[]> {
    const periodContent: PeriodContent[] = []
    
    this.contentStore.forEach(content => {
      if ('periodId' in content && content.periodId === periodId) {
        periodContent.push(content)
      }
    })

    return periodContent
  }

  async getMilestoneContent(milestoneId: string): Promise<MilestoneContent | null> {
    let result: MilestoneContent | null = null
    
    this.contentStore.forEach(content => {
      if ('milestoneId' in content && content.milestoneId === milestoneId) {
        result = content
      }
    })

    return result
  }

  async getEconomicImpactContent(): Promise<EconomicImpactContent[]> {
    const impactContent: EconomicImpactContent[] = []
    
    this.contentStore.forEach(content => {
      if ('metrics' in content) {
        impactContent.push(content)
      }
    })

    return impactContent
  }

  async getRegionalImpactContent(region: string): Promise<RegionalImpactContent[]> {
    const regionalContent: RegionalImpactContent[] = []
    
    this.contentStore.forEach(content => {
      if ('region' in content && content.region === region) {
        regionalContent.push(content)
      }
    })

    return regionalContent
  }

  async updateContent(id: string, content: ContentType): Promise<ContentValidationResult> {
    if (!this.contentStore.has(id)) {
      return {
        isValid: false,
        errors: [{
          code: 'CONTENT_NOT_FOUND',
          message: `Content with id ${id} not found`
        }]
      }
    }

    const validationResult = validateContent(content)
    if (!validationResult.isValid) {
      return validationResult
    }

    this.contentStore.set(id, content)
    return validationResult
  }

  async deleteContent(id: string): Promise<boolean> {
    const deleted = this.contentStore.delete(id)
    if (deleted) {
      // Clean up relations
      this.contentRelations.delete(id)
      this.contentRelations.forEach(relations => {
        relations.delete(id)
      })
    }
    return deleted
  }

  async getRelatedContent(id: string): Promise<ContentType[]> {
    const relatedIds = this.contentRelations.get(id)
    if (!relatedIds) return []

    const relatedContent: ContentType[] = []
    relatedIds.forEach(relatedId => {
      const content = this.contentStore.get(relatedId)
      if (content) {
        relatedContent.push(content)
      }
    })

    return relatedContent
  }
}

// Export singleton instance
export const contentService = new ContentService() 