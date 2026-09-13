import { ImageGallery } from '@/components/common/ImageGallery'
import type { MediaAsset } from '@/types'

export function IssueEvidenceGallery({ items }: { items: MediaAsset[] }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">No evidence uploaded yet.</p>
  return <ImageGallery items={items} />
}
