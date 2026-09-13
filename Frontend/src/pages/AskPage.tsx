import { sendAgentMessage } from '@/api/agent.api'
import { AIInsightBadge } from '@/components/common/AIInsightBadge'
import { PageHeader } from '@/components/common/PageHeader'
import { SourceCitation } from '@/components/common/SourceCitation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { AgentConversation } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function AskPage() {
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState<AgentConversation | null>(null)
  const [streamHint, setStreamHint] = useState(false)
  const mutation = useMutation({
    mutationFn: (message: string) => sendAgentMessage(message, conversation?.id),
    onMutate: () => setStreamHint(true),
    onSuccess: (c) => {
      setConversation(c)
      setStreamHint(false)
    },
    onError: () => setStreamHint(false),
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        eyebrow="Ask Uttarakhand"
        title="A knowledge assistant, not yet live"
        description="UI prepared for FastAPI + LangGraph. POST /agent/chat and /agent/stream. No model runs here."
      />
      <div className="rounded-2xl border bg-card">
        <ScrollArea className="h-[480px] p-4">
          {!conversation?.messages.length ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <Sparkles className="h-8 w-8 text-saffron" />
              <p className="max-w-md text-sm text-muted-foreground">
                Ask about Harela, forest fires, ghost villages, Char Dham roads or Aipan. Answers will cite the
                knowledge library when LangGraph is connected.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversation.messages.map((m) => (
                <div key={m.id} className={m.role === 'user' ? 'ml-8' : 'mr-8'}>
                  <div
                    className={`rounded-xl p-4 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  >
                    {m.role === 'assistant' ? (
                      <div className="mb-2">
                        <AIInsightBadge label="AI-generated" />
                      </div>
                    ) : null}
                    <p>{m.content}</p>
                  </div>
                  {m.citations.length ? (
                    <div className="mt-2 grid gap-2">
                      {m.citations.map((c) => (
                        <SourceCitation key={c.id} citation={c} />
                      ))}
                    </div>
                  ) : null}
                  {m.relatedQuestions.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.relatedQuestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          className="rounded-full border px-3 py-1 text-xs"
                          onClick={() => mutation.mutate(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {streamHint ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Streaming placeholder…
                </p>
              ) : null}
              {mutation.isError ? (
                <p role="alert" className="text-sm text-destructive">
                  Could not reach the agent. Using mock mode, retry.
                </p>
              ) : null}
            </div>
          )}
        </ScrollArea>
        <form
          className="flex gap-2 border-t p-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (!input.trim()) return
            mutation.mutate(input)
            setInput('')
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Uttarakhand…"
            aria-label="Message"
          />
          <Button type="submit" disabled={mutation.isPending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
