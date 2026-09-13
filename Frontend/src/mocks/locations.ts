import type { DistrictSummary, Place } from '@/types'

const img = (id: string, alt: string) => ({
  id,
  kind: 'IMAGE' as const,
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
  thumbnailUrl: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=80`,
  alt,
  createdAt: '2024-06-01T00:00:00.000Z',
})

export const places: Place[] = [
  {
    id: 'p-kedarnath',
    slug: 'kedarnath',
    name: 'Kedarnath',
    locality: 'Kedarnath',
    district: 'Rudraprayag',
    region: 'Garhwal',
    category: 'Temples',
    coordinates: { latitude: 30.7352, longitude: 79.0669 },
    description:
      'A high Himalayan shrine on the Mandakini, Kedarnath is among the Char Dham and a living pilgrimage landscape after the 2013 floods.',
    history:
      'The stone temple is associated with the Pandavas and Adi Shankara. Reconstruction after 2013 reshaped access, hydrology and settlement around the shrine.',
    culture:
      'Pilgrimage, highland pastoral routes and Garhwali ritual calendars still organise life in the Mandakini valley.',
    elevationM: 3583,
    gallery: [
      img('photo-1464822759023-fed622ff2c3b', 'Kedarnath peaks'),
      img('photo-1506905925346-21bda4d32df4', 'Himalayan temple ridge'),
    ],
    nearbyPlaceIds: ['p-tungnath', 'p-chopta'],
    relatedIssueIds: ['i-landslide-rudraprayag', 'i-tourism-kedarnath'],
    relatedStoryIds: ['post-kedar-memory'],
    tags: ['Char Dham', 'Mandakini', 'pilgrimage'],
    popularity: 98,
    createdAt: '2024-01-10T00:00:00.000Z',
  },
  {
    id: 'p-nainital',
    slug: 'nainital',
    name: 'Nainital',
    locality: 'Nainital town',
    district: 'Nainital',
    region: 'Kumaon',
    category: 'Lakes',
    coordinates: { latitude: 29.3803, longitude: 79.4636 },
    description:
      'A colonial hill station around Naini Lake, now under pressure from traffic, waste and shrinking lake health.',
    history:
      'Founded as a British summer capital of the Kumaon region, Nainital grew around the crater lake and surrounding ridgelines.',
    culture:
      'Kumaoni festivals, lake-edge bazaars and a mixed hill-station civic culture.',
    elevationM: 2084,
    gallery: [
      img('photo-1548013146-72479768bada', 'Nainital lake'),
      img('photo-1470071459604-3b5ec3a7fe05', 'Kumaon hills'),
    ],
    nearbyPlaceIds: ['p-bhimtal', 'p-mukteshwar'],
    relatedIssueIds: ['i-waste-nainital', 'i-water-naini'],
    relatedStoryIds: [],
    tags: ['lake', 'Kumaon', 'hill station'],
    popularity: 92,
    createdAt: '2024-01-11T00:00:00.000Z',
  },
  {
    id: 'p-valley-of-flowers',
    slug: 'valley-of-flowers',
    name: 'Valley of Flowers',
    locality: 'Ghangaria',
    district: 'Chamoli',
    region: 'Garhwal',
    category: 'Wildlife',
    coordinates: { latitude: 30.728, longitude: 79.605 },
    description:
      'A UNESCO alpine meadow known for monsoon blooms, Himalayan ecology and tightly regulated trekking.',
    history:
      'Documented by Frank Smythe in 1931 and later notified as a national park, it sits beside the Hemkund pilgrimage.',
    culture:
      'Bhotia and Garhwali highland pastoralism, pilgrimage and conservation science meet on the same trail.',
    elevationM: 3658,
    gallery: [
      img('photo-1469474968028-56623f02e42e', 'Alpine meadow'),
      img('photo-1441974231531-c6227db76b6e', 'Forest canopy'),
    ],
    nearbyPlaceIds: ['p-hemkund', 'p-badrinath'],
    relatedIssueIds: ['i-tourism-pressure-chamoli'],
    relatedStoryIds: [],
    tags: ['UNESCO', 'trek', 'alpine'],
    popularity: 95,
    createdAt: '2024-01-12T00:00:00.000Z',
  },
  {
    id: 'p-almora',
    slug: 'almora',
    name: 'Almora',
    locality: 'Almora town',
    district: 'Almora',
    region: 'Kumaon',
    category: 'Heritage',
    coordinates: { latitude: 29.5892, longitude: 79.6467 },
    description:
      'A ridge town of temples, Aipan floors and old bazaars, once the cultural seat of Kumaon.',
    history:
      'Founded by the Chand dynasty, Almora later became a British hill cantonment and remains a centre for Kumaoni arts.',
    culture:
      'Aipan, wood carving, Nanda Devi worship and Kumaoni cuisine shape the town’s public life.',
    elevationM: 1642,
    gallery: [
      img('photo-1605640846364-4f4c1c0e0b0b', 'Hill town'),
      img('photo-1519681393784-d120267933ba', 'Himalayan night'),
    ],
    nearbyPlaceIds: ['p-kausani', 'p-jageshwar'],
    relatedIssueIds: ['i-migration-almora'],
    relatedStoryIds: [],
    tags: ['Aipan', 'Kumaon', 'heritage'],
    popularity: 78,
    createdAt: '2024-01-13T00:00:00.000Z',
  },
  {
    id: 'p-rishikesh',
    slug: 'rishikesh',
    name: 'Rishikesh',
    locality: 'Rishikesh',
    district: 'Dehradun',
    region: 'Garhwal',
    category: 'Rivers',
    coordinates: { latitude: 30.0869, longitude: 78.2676 },
    description:
      'Ganga-side yoga town and gateway to Garhwal, balancing pilgrimage, adventure tourism and river ecology.',
    history:
      'An ancient tirtha that became a global yoga destination in the late twentieth century.',
    culture:
      'Ashrams, Ganga aarti, Garhwali hinterland and a large seasonal visitor economy.',
    elevationM: 372,
    gallery: [
      img('photo-1544735716-392fe2489ffa', 'Ganga at Rishikesh'),
      img('photo-1500534314209-a25ddb2bd429', 'River valley'),
    ],
    nearbyPlaceIds: ['p-haridwar', 'p-mussoorie'],
    relatedIssueIds: ['i-waste-rishikesh'],
    relatedStoryIds: [],
    tags: ['Ganga', 'yoga', 'adventure'],
    popularity: 90,
    createdAt: '2024-01-14T00:00:00.000Z',
  },
  {
    id: 'p-munsiyari',
    slug: 'munsiyari',
    name: 'Munsiyari',
    locality: 'Munsiyari',
    district: 'Pithoragarh',
    region: 'Kumaon',
    category: 'Villages',
    coordinates: { latitude: 30.0674, longitude: 80.2436 },
    description:
      'A Bhotia trading town facing Panchachuli, on historic trans-Himalayan routes toward Tibet.',
    history:
      'Once a hub of the Johar trade, Munsiyari remains a gateway to Milam and the high Kumaon glaciers.',
    culture:
      'Bhotia weaving, highland agriculture and stories of the closed Tibet trade.',
    elevationM: 2298,
    gallery: [
      img('photo-1482192505345-5656af4ab2b0', 'Snow peaks'),
      img('photo-1454496522488-7a6e7efe8ada', 'Village ridge'),
    ],
    nearbyPlaceIds: ['p-milam'],
    relatedIssueIds: ['i-employment-pithoragarh'],
    relatedStoryIds: [],
    tags: ['Bhotia', 'Panchachuli', 'Johar'],
    popularity: 74,
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'p-chopta',
    slug: 'chopta',
    name: 'Chopta',
    locality: 'Chopta',
    district: 'Rudraprayag',
    region: 'Garhwal',
    category: 'Trekking',
    coordinates: { latitude: 30.487, longitude: 79.21 },
    description:
      'Meadow campsite and trailhead for Tungnath–Chandrashila, known as a mini Switzerland of Garhwal.',
    history:
      'A seasonal pastoral landscape that became a popular short Himalayan trek in the last two decades.',
    culture:
      'Bugyal grazing, temple pilgrimage and a growing homestay economy.',
    elevationM: 2680,
    gallery: [
      img('photo-1464822759023-fed622ff2c3b', 'Chopta meadows'),
      img('photo-1500530855697-b586d89ba3ee', 'Forest trail'),
    ],
    nearbyPlaceIds: ['p-tungnath', 'p-kedarnath'],
    relatedIssueIds: ['i-tourism-kedarnath'],
    relatedStoryIds: [],
    tags: ['bugyal', 'Tungnath', 'trek'],
    popularity: 86,
    createdAt: '2024-01-16T00:00:00.000Z',
  },
  {
    id: 'p-jageshwar',
    slug: 'jageshwar',
    name: 'Jageshwar Temples',
    locality: 'Jageshwar',
    district: 'Almora',
    region: 'Kumaon',
    category: 'Temples',
    coordinates: { latitude: 29.637, longitude: 79.594 },
    description:
      'A deodar grove of over a hundred stone temples, one of Kumaon’s most important Shaiva complexes.',
    history:
      'Built mainly between the 7th and 12th centuries under Katyuri patronage.',
    culture:
      'Shaiva ritual, deodar sacred groves and Kumaoni temple architecture.',
    elevationM: 1870,
    gallery: [
      img('photo-1548013146-72479768bada', 'Stone temple'),
      img('photo-1441974231531-c6227db76b6e', 'Deodar forest'),
    ],
    nearbyPlaceIds: ['p-almora'],
    relatedIssueIds: [],
    relatedStoryIds: [],
    tags: ['Katyuri', 'Shaiva', 'deodar'],
    popularity: 70,
    createdAt: '2024-01-17T00:00:00.000Z',
  },
  {
    id: 'p-haridwar',
    slug: 'haridwar',
    name: 'Haridwar',
    locality: 'Har Ki Pauri',
    district: 'Haridwar',
    region: 'Garhwal',
    category: 'Rivers',
    coordinates: { latitude: 29.9457, longitude: 78.1642 },
    description:
      'Where the Ganga enters the plains. A dense pilgrimage city with Kumbh cycles and riverfront civic strain.',
    history:
      'One of Hinduism’s seven sacred cities, Haridwar’s ghats have structured North Indian pilgrimage for centuries.',
    culture:
      'Ganga aarti, akharas, and a large service economy around ritual bathing.',
    elevationM: 314,
    gallery: [
      img('photo-1561361513-2d000a50f0dc', 'Haridwar ghat'),
      img('photo-1544735716-392fe2489ffa', 'Ganga evening'),
    ],
    nearbyPlaceIds: ['p-rishikesh'],
    relatedIssueIds: ['i-waste-rishikesh'],
    relatedStoryIds: [],
    tags: ['Ganga', 'Kumbh', 'ghat'],
    popularity: 88,
    createdAt: '2024-01-18T00:00:00.000Z',
  },
  {
    id: 'p-chakrata',
    slug: 'chakrata',
    name: 'Chakrata',
    locality: 'Chakrata',
    district: 'Dehradun',
    region: 'Jaunsar-Bawar',
    category: 'Cultural Sites',
    coordinates: { latitude: 30.703, longitude: 77.868 },
    description:
      'A cantonment town in Jaunsar-Bawar, surrounded by deodar forests and distinct village architecture.',
    history:
      'Established as a British hill cantonment; the surrounding villages keep Jaunsari kinship and festival systems.',
    culture:
      'Jaunsari dance, wooden houses and community festivals such as Bissu.',
    elevationM: 2118,
    gallery: [
      img('photo-1470071459604-3b5ec3a7fe05', 'Deodar hills'),
      img('photo-1500534314209-a25ddb2bd429', 'Forest road'),
    ],
    nearbyPlaceIds: ['p-mussoorie'],
    relatedIssueIds: [],
    relatedStoryIds: [],
    tags: ['Jaunsari', 'cantonment', 'deodar'],
    popularity: 61,
    createdAt: '2024-01-19T00:00:00.000Z',
  },
  {
    id: 'p-kausani',
    slug: 'kausani',
    name: 'Kausani',
    locality: 'Kausani',
    district: 'Bageshwar',
    region: 'Kumaon',
    category: 'Mountains',
    coordinates: { latitude: 29.843, longitude: 79.603 },
    description:
      'A tea-ridge village with a 300-km Himalayan panorama, associated with Gandhi’s Anasakti Ashram.',
    history:
      'Gandhi stayed here in 1929; the ridge later became a quiet Kumaoni tea landscape.',
    culture:
      'Kumaoni tea, ridge agriculture and Himalayan view-tourism.',
    elevationM: 1890,
    gallery: [
      img('photo-1464822759023-fed622ff2c3b', 'Kausani panorama'),
      img('photo-1506905925346-21bda4d32df4', 'Tea ridge'),
    ],
    nearbyPlaceIds: ['p-almora', 'p-bageshwar'],
    relatedIssueIds: ['i-migration-almora'],
    relatedStoryIds: [],
    tags: ['tea', 'Gandhi', 'views'],
    popularity: 72,
    createdAt: '2024-01-20T00:00:00.000Z',
  },
  {
    id: 'p-corbett',
    slug: 'jim-corbett',
    name: 'Jim Corbett National Park',
    locality: 'Ramnagar',
    district: 'Nainital',
    region: 'Kumaon',
    category: 'Wildlife',
    coordinates: { latitude: 29.53, longitude: 78.7747 },
    description:
      'India’s oldest national park, a terai-bhabar landscape of tigers, elephants and riverine forest.',
    history:
      'Established in 1936 as Hailey National Park, later named for hunter-turned-conservationist Jim Corbett.',
    culture:
      'Van Gujjar pastoralism, Kumaoni forest villages and a large wildlife-tourism economy.',
    elevationM: 400,
    gallery: [
      img('photo-1549366021-9f761d450615', 'Tiger habitat'),
      img('photo-1441974231531-c6227db76b6e', 'Sal forest'),
    ],
    nearbyPlaceIds: ['p-nainital'],
    relatedIssueIds: ['i-waste-nainital'],
    relatedStoryIds: [],
    tags: ['tiger', 'terai', 'park'],
    popularity: 89,
    createdAt: '2024-01-21T00:00:00.000Z',
  },
]

export const districtSummaries: DistrictSummary[] = [
  { name: 'Dehradun', region: 'Garhwal', issueCount: 18, placeCount: 6, coordinates: { latitude: 30.3165, longitude: 78.0322 } },
  { name: 'Haridwar', region: 'Garhwal', issueCount: 12, placeCount: 3, coordinates: { latitude: 29.9457, longitude: 78.1642 } },
  { name: 'Nainital', region: 'Kumaon', issueCount: 14, placeCount: 5, coordinates: { latitude: 29.3803, longitude: 79.4636 } },
  { name: 'Almora', region: 'Kumaon', issueCount: 11, placeCount: 4, coordinates: { latitude: 29.5892, longitude: 79.6467 } },
  { name: 'Chamoli', region: 'Garhwal', issueCount: 16, placeCount: 7, coordinates: { latitude: 30.407, longitude: 79.329 } },
  { name: 'Pauri Garhwal', region: 'Garhwal', issueCount: 13, placeCount: 3, coordinates: { latitude: 30.146, longitude: 78.781 } },
  { name: 'Tehri Garhwal', region: 'Garhwal', issueCount: 10, placeCount: 3, coordinates: { latitude: 30.3833, longitude: 78.48 } },
  { name: 'Rudraprayag', region: 'Garhwal', issueCount: 15, placeCount: 5, coordinates: { latitude: 30.284, longitude: 78.981 } },
  { name: 'Uttarkashi', region: 'Garhwal', issueCount: 12, placeCount: 4, coordinates: { latitude: 30.73, longitude: 78.435 } },
  { name: 'Pithoragarh', region: 'Kumaon', issueCount: 9, placeCount: 4, coordinates: { latitude: 29.583, longitude: 80.218 } },
  { name: 'Bageshwar', region: 'Kumaon', issueCount: 7, placeCount: 3, coordinates: { latitude: 29.837, longitude: 79.771 } },
  { name: 'Champawat', region: 'Kumaon', issueCount: 6, placeCount: 2, coordinates: { latitude: 29.336, longitude: 80.091 } },
  { name: 'Udham Singh Nagar', region: 'Kumaon', issueCount: 8, placeCount: 2, coordinates: { latitude: 28.98, longitude: 79.4 } },
]

export const getPlaceBySlug = (slug: string) => places.find((p) => p.slug === slug)
export const getPlaceById = (id: string) => places.find((p) => p.id === id)
