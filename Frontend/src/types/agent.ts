import type { ISODateTime, UUID } from './common'

export type AgentRole = 'user' | 'assistant' | 'system'

export type AgentCitation = {
  id: UUID
  title: string
  source: string
  href?: string
  snippet: string
  verified: boolean
}

export type AgentMessage = {
  id: UUID
  conversationId: UUID
  role: AgentRole
  content: string
  streaming?: boolean
  citations: AgentCitation[]
  relatedQuestions: string[]
  createdAt: ISODateTime
}

export type AgentConversation = {
  id: UUID
  title: string
  messages: AgentMessage[]
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export type SendAgentMessagePayload = {
  message: string
  conversationId?: UUID
}
