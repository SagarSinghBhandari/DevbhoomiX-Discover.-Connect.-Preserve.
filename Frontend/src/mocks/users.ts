import type { User } from '@/types'

export const currentUser: User = {
  id: '11111111-1111-4111-8111-111111111111',
  username: 'meera.rawat',
  displayName: 'Meera Rawat',
  email: 'meera.rawat@uttarakhand.in',
  bio: 'Documenting Garhwali oral histories and village water systems from Pauri.',
  location: 'Srinagar, Pauri Garhwal',
  district: 'Pauri Garhwal',
  avatarUrl:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  coverUrl:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
  interests: ['Oral history', 'Water', 'Aipan', 'Harela'],
  contributionScore: 842,
  followers: 1284,
  following: 196,
  followedByMe: false,
  role: 'CONTRIBUTOR',
  verified: true,
  createdAt: '2023-04-12T08:00:00.000Z',
}

export const users: User[] = [
  currentUser,
  {
    id: '22222222-2222-4222-8222-222222222222',
    username: 'arjun.bisht',
    displayName: 'Arjun Bisht',
    email: 'arjun.bisht@uttarakhand.in',
    bio: 'Civic reporter covering roads, landslides and last-mile healthcare in Chamoli.',
    location: 'Gopeshwar, Chamoli',
    district: 'Chamoli',
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    interests: ['Civic issues', 'Disaster', 'Trekking'],
    contributionScore: 1210,
    followers: 3402,
    following: 88,
    followedByMe: true,
    role: 'CONTRIBUTOR',
    verified: true,
    createdAt: '2022-11-03T10:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    username: 'kavita.joshi',
    displayName: 'Kavita Joshi',
    email: 'kavita.joshi@uttarakhand.in',
    bio: 'Kumaoni craft researcher. Aipan, Ringaal and village architecture.',
    location: 'Almora',
    district: 'Almora',
    avatarUrl:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
    interests: ['Aipan', 'Crafts', 'Architecture'],
    contributionScore: 980,
    followers: 2104,
    following: 240,
    followedByMe: false,
    role: 'CONTRIBUTOR',
    verified: true,
    createdAt: '2023-01-18T09:30:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    username: 'dev.neggi',
    displayName: 'Dev Negi',
    email: 'dev.negi@uttarakhand.in',
    bio: 'Jaunsari culture keeper from Chakrata. Folk music and village commons.',
    location: 'Chakrata, Dehradun',
    district: 'Dehradun',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1482192505345-5656af4ab2b0?auto=format&fit=crop&w=1600&q=80',
    interests: ['Jaunsari', 'Folk music', 'Commons'],
    contributionScore: 640,
    followers: 876,
    following: 132,
    followedByMe: false,
    role: 'CITIZEN',
    verified: false,
    createdAt: '2024-02-01T12:00:00.000Z',
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    username: 'nanda.rathore',
    displayName: 'Nanda Rathore',
    email: 'nanda.rathore@uttarakhand.in',
    bio: 'Forest-fire watcher and Himalayan ecology educator, Nainital.',
    location: 'Nainital',
    district: 'Nainital',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
    interests: ['Ecology', 'Forest fires', 'Education'],
    contributionScore: 1540,
    followers: 4120,
    following: 54,
    followedByMe: true,
    role: 'MODERATOR',
    verified: true,
    createdAt: '2021-08-21T07:00:00.000Z',
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    username: 'official.uk',
    displayName: 'Uttarakhand Civic Desk',
    email: 'civic@uttarakhand.gov.in',
    bio: 'Official grievance and public information desk (mock).',
    location: 'Dehradun',
    district: 'Dehradun',
    avatarUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80',
    interests: ['Governance'],
    contributionScore: 220,
    followers: 8900,
    following: 12,
    followedByMe: false,
    role: 'OFFICIAL',
    verified: true,
    createdAt: '2020-01-01T00:00:00.000Z',
  },
]

export const getUserByUsername = (username: string) =>
  users.find((u) => u.username === username)

export const getUserById = (id: string) => users.find((u) => u.id === id)
