import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, MessageSquare, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  {
    to: '/create/post',
    title: 'Start a discussion',
    body: 'Question, experience, news or knowledge note.',
    icon: MessageSquare,
  },
  {
    to: '/create/issue',
    title: 'Report an issue',
    body: 'Civic tracker with map, evidence and status.',
    icon: TriangleAlert,
  },
  {
    to: '/create/article',
    title: 'Write an article',
    body: 'Long-form knowledge for the library.',
    icon: BookOpen,
  },
]

export function CreatePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contribute"
        title="Document, discuss or act"
        description="Choose a contribution type. All three map to FastAPI endpoints later."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Link key={item.to} to={item.to}>
            <Card className="h-full transition hover:border-primary">
              <CardHeader>
                <item.icon className="h-6 w-6 text-saffron" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
