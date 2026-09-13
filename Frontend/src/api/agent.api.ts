import { delay } from '@/lib/utils'
import type { AgentConversation, AgentMessage, SendAgentMessagePayload } from '@/types'
import { apiClient } from './client'

const conversations: AgentConversation[] = []

function mockReply(message: string, conversationId: string): AgentMessage {
  return {
    id: crypto.randomUUID(),
    conversationId,
    role: 'assistant',
    content: `This is a placeholder answer for “${message}”. The Ask Uttarakhand assistant will be powered by FastAPI + LangGraph. Until then, browse Issues, Knowledge and Places — citations below are sample sources.`,
    citations: [
      {
        id: crypto.randomUUID(),
        title: 'Chir pine and the April fires',
        source: 'Knowledge library',
        href: '/knowledge/chir-pine-and-the-april-fires',
        snippet: 'Van panchayats still run the first response.',
        verified: true,
      },
      {
        id: crypto.randomUUID(),
        title: 'Naini Lake edge waste overflow',
        source: 'Civic issues',
        href: '/issues/i-waste-nainital',
        snippet: 'Mall Road drains dump untreated waste into the lake.',
        verified: true,
      },
    ],
    relatedQuestions: [
      'Which districts report the most forest fires?',
      'What is Harela and where is it celebrated?',
      'How do I file a civic issue with evidence?',
    ],
    createdAt: new Date().toISOString(),
  }
}

export async function sendAgentMessage(
  message: string,
  conversationId?: string,
): Promise<AgentConversation> {
  const payload: SendAgentMessagePayload = { message, conversationId }

  if (apiClient.useMock) {
    await delay(700)
    const id = conversationId || crypto.randomUUID()
    let convo = conversations.find((c) => c.id === id)
    if (!convo) {
      convo = {
        id,
        title: message.slice(0, 48),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      conversations.unshift(convo)
    }
    const userMsg: AgentMessage = {
      id: crypto.randomUUID(),
      conversationId: id,
      role: 'user',
      content: message,
      citations: [],
      relatedQuestions: [],
      createdAt: new Date().toISOString(),
    }
    convo.messages.push(userMsg, mockReply(message, id))
    convo.updatedAt = new Date().toISOString()
    return { ...convo }
  }

  return apiClient.post('/api/agent/chat', payload)
}

export async function getAgentConversations(): Promise<AgentConversation[]> {
  if (apiClient.useMock) {
    await delay(200)
    return conversations
  }
  return apiClient.get('/api/agent/conversations')
}

export async function getAgentConversation(id: string): Promise<AgentConversation> {
  if (apiClient.useMock) {
    await delay(200)
    const convo = conversations.find((c) => c.id === id)
    if (!convo) throw new Error('Conversation not found')
    return convo
  }
  return apiClient.get(`/api/agent/conversations/${id}`)
}

export async function streamAgentMessage(_message: string, _conversationId?: string) {
  return apiClient.post('/api/agent/stream', { message: _message, conversationId: _conversationId })
}
