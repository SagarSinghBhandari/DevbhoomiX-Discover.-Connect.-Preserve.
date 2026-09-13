import { PageHeader } from '@/components/common/PageHeader'
import { ArticleEditor } from '@/components/knowledge/ArticleEditor'

export function CreateArticlePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Knowledge"
        title="Article editor"
        description="Save draft, preview, submit for review. createArticle / saveDraft / publishArticle."
      />
      <ArticleEditor />
    </div>
  )
}
