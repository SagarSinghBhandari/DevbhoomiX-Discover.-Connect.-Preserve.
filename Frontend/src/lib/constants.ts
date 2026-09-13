export const APP_NAME = 'UttaraKhand'
export const APP_TAGLINE = 'Discover. Document. Understand. Shape Uttarakhand.'

export const DISTRICTS = [
  'Dehradun',
  'Haridwar',
  'Nainital',
  'Almora',
  'Chamoli',
  'Pauri Garhwal',
  'Tehri Garhwal',
  'Rudraprayag',
  'Uttarkashi',
  'Pithoragarh',
  'Bageshwar',
  'Champawat',
  'Udham Singh Nagar',
] as const

export const REGIONS = ['Garhwal', 'Kumaon', 'Jaunsar-Bawar', 'Trans-Himalayan'] as const

export const ISSUE_CATEGORIES = [
  'Roads',
  'Water',
  'Education',
  'Healthcare',
  'Environment',
  'Tourism',
  'Electricity',
  'Waste',
  'Transport',
  'Employment',
  'Disaster',
  'Infrastructure',
  'Other',
] as const

export const ISSUE_STATUSES = [
  'REPORTED',
  'UNDER_REVIEW',
  'VERIFIED',
  'IN_PROGRESS',
  'RESOLVED',
  'REJECTED',
] as const

export const ISSUE_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const

export const PLACE_CATEGORIES = [
  'Mountains',
  'Valleys',
  'Rivers',
  'Lakes',
  'Temples',
  'Heritage',
  'Villages',
  'Wildlife',
  'Trekking',
  'Cultural Sites',
] as const

export const POST_TYPES = [
  'Discussion',
  'Question',
  'Opinion',
  'Experience',
  'News',
  'Knowledge',
  'Issue',
  'Announcement',
] as const

export const ARTICLE_TYPES = [
  'Articles',
  'Research',
  'Reports',
  'Historical Documents',
  'Government Documents',
  'Local Knowledge',
  'Oral Histories',
  'Educational Resources',
] as const

export const CULTURE_COMMUNITIES = ['Garhwali', 'Kumaoni', 'Jaunsari', 'Bhotia'] as const

export const CONTENT_ORIGINS = [
  'COMMUNITY_SUBMITTED',
  'VERIFIED',
  'OFFICIAL',
  'AI_SUGGESTED',
] as const

export const POPULAR_SEARCHES = [
  'Kedarnath',
  'Nanda Devi Raj Jat',
  'Aipan art',
  'forest fires',
  'Harela',
  'Valley of Flowers',
  'out-migration',
  'Kumaoni cuisine',
]

export const UK_CENTER = { lat: 30.0668, lng: 79.0193 }

export const NAV_PRIMARY = [
  { to: '/discover', label: 'Discover' },
  { to: '/culture', label: 'Culture' },
  { to: '/places', label: 'Places' },
  { to: '/issues', label: 'Issues' },
  { to: '/knowledge', label: 'Knowledge' },
  { to: '/community', label: 'Community' },
] as const
