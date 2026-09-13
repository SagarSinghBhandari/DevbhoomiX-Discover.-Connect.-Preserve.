import type { Comment, Post } from '@/types'
import { users } from './users'

const [meera, arjun, kavita, dev, nanda] = users

export const posts: Post[] = [
  {
    id: 'post-kedar-memory',
    author: arjun,
    type: 'Experience',
    content:
      'Walked the Mandakini terrace above Sonprayag after the latest slide. Elders still mark the 2013 high-flood line with a red cloth on the deodar. We should map those memory marks before they fade.',
    media: [
      {
        id: 'pm1',
        kind: 'IMAGE',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Himalayan valley',
        createdAt: '2025-08-02T10:00:00.000Z',
      },
    ],
    tags: ['Kedarnath', 'memory', 'disaster'],
    district: 'Rudraprayag',
    locationLabel: 'Sonprayag, Rudraprayag',
    likeCount: 214,
    commentCount: 18,
    likedByMe: true,
    savedByMe: true,
    createdAt: '2025-08-02T10:12:00.000Z',
  },
  {
    id: 'post-aipan',
    author: kavita,
    type: 'Knowledge',
    content:
      'Aipan is not wall décor. In Almora homes the rice-paste geometry is redrawn for every rite of passage. Sharing a short field note on the difference between peeth and chauki patterns.',
    media: [
      {
        id: 'pm2',
        kind: 'IMAGE',
        url: 'https://images.unsplash.com/photo-1578662996442-48f36bddf6ba?auto=format&fit=crop&w=1200&q=80',
        alt: 'Traditional floor art',
        createdAt: '2025-08-10T08:00:00.000Z',
      },
    ],
    tags: ['Aipan', 'Kumaoni', 'craft'],
    district: 'Almora',
    locationLabel: 'Almora',
    likeCount: 401,
    commentCount: 36,
    likedByMe: false,
    savedByMe: true,
    createdAt: '2025-08-10T08:40:00.000Z',
  },
  {
    id: 'post-harela',
    author: meera,
    type: 'Discussion',
    content:
      'Harela in Pauri this year: seven grains germinated in tin trays on every courtyard. Should schools treat Harela as an ecology lesson, not only a cultural holiday?',
    media: [],
    tags: ['Harela', 'education', 'Garhwali'],
    district: 'Pauri Garhwal',
    locationLabel: 'Srinagar, Pauri',
    likeCount: 156,
    commentCount: 29,
    likedByMe: false,
    savedByMe: false,
    createdAt: '2025-07-16T06:00:00.000Z',
  },
  {
    id: 'post-jaunsari',
    author: dev,
    type: 'Question',
    content:
      'Looking for recordings of Jaunsari dhol-damaun from Chakrata villages. Many cassettes from the 90s are rotting. Anyone digitising?',
    media: [],
    tags: ['Jaunsari', 'folk music', 'archive'],
    district: 'Dehradun',
    locationLabel: 'Chakrata',
    likeCount: 88,
    commentCount: 14,
    likedByMe: true,
    savedByMe: false,
    createdAt: '2025-08-12T14:20:00.000Z',
  },
  {
    id: 'post-fire',
    author: nanda,
    type: 'News',
    content:
      'Ramgarh beat: chir pine fire contained after 19 hours. Van panchayat crews still need blowers before next April. Thread with beat-wise map.',
    media: [
      {
        id: 'pm3',
        kind: 'IMAGE',
        url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80',
        alt: 'Hill smoke',
        createdAt: '2025-05-03T08:00:00.000Z',
      },
    ],
    tags: ['forest fire', 'Nainital', 'ecology'],
    district: 'Nainital',
    locationLabel: 'Ramgarh',
    likeCount: 512,
    commentCount: 41,
    likedByMe: true,
    savedByMe: false,
    createdAt: '2025-05-03T08:15:00.000Z',
  },
  {
    id: 'post-opinion-tourism',
    author: arjun,
    type: 'Opinion',
    content:
      'Char Dham widening without slope science is not “development”. It is deferred disaster. We need public cut-slope audits, not only ribbon cuttings.',
    media: [],
    tags: ['infrastructure', 'Char Dham', 'opinion'],
    district: 'Chamoli',
    locationLabel: 'Chamoli',
    likeCount: 673,
    commentCount: 92,
    likedByMe: false,
    savedByMe: true,
    createdAt: '2025-08-20T11:00:00.000Z',
  },
  {
    id: 'post-announcement',
    author: kavita,
    type: 'Announcement',
    content:
      'Open workshop in Almora: documenting Ringaal basketry with three master weavers. 14 September, Nanda Devi compound. Bring notebooks, not just phones.',
    media: [],
    tags: ['Ringaal', 'workshop', 'Almora'],
    district: 'Almora',
    locationLabel: 'Almora',
    likeCount: 129,
    commentCount: 8,
    likedByMe: false,
    savedByMe: false,
    createdAt: '2025-08-22T09:00:00.000Z',
  },
  {
    id: 'post-issue-link',
    author: meera,
    type: 'Issue',
    content:
      'Flagging the Kaljikhal single-teacher schools again. If you have SMC letters, add them as evidence on the issue page.',
    media: [],
    tags: ['education', 'Pauri'],
    district: 'Pauri Garhwal',
    locationLabel: 'Kaljikhal',
    likeCount: 77,
    commentCount: 11,
    likedByMe: false,
    savedByMe: false,
    createdAt: '2025-08-03T05:00:00.000Z',
  },
]

export const comments: Comment[] = [
  {
    id: 'c1',
    postId: 'post-kedar-memory',
    author: meera,
    body: 'We recorded similar cloth marks in Kedarnath after 2013. Happy to share the oral-history clips.',
    createdAt: '2025-08-02T12:00:00.000Z',
  },
  {
    id: 'c2',
    postId: 'post-aipan',
    author: meera,
    body: 'The chauki grid in my grandmother’s house in Srinagar used geru, not only rice paste.',
    createdAt: '2025-08-10T10:00:00.000Z',
  },
  {
    id: 'c3',
    issueId: 'i-landslide-rudraprayag',
    author: nanda,
    body: 'Slope angle on the inner bend looks steeper than the 2014 DPR assumed.',
    createdAt: '2025-07-13T08:00:00.000Z',
  },
]

export const getPostById = (id: string) => posts.find((p) => p.id === id)
