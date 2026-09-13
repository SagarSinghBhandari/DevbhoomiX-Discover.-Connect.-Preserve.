import { PageHeader } from '@/components/common/PageHeader'
import { PostComposer } from '@/components/posts/PostComposer'

export function CreatePostPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Community" title="Compose a post" />
      <PostComposer />
    </div>
  )
}
