import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'discover',
        lazy: async () => ({ Component: (await import('@/pages/DiscoverPage')).DiscoverPage }),
      },
      {
        path: 'culture',
        lazy: async () => ({ Component: (await import('@/pages/CulturePage')).CulturePage }),
      },
      {
        path: 'culture/:slug',
        lazy: async () => ({ Component: (await import('@/pages/CultureDetailPage')).CultureDetailPage }),
      },
      {
        path: 'places',
        lazy: async () => ({ Component: (await import('@/pages/PlacesPage')).PlacesPage }),
      },
      {
        path: 'places/:slug',
        lazy: async () => ({ Component: (await import('@/pages/PlaceDetailPage')).PlaceDetailPage }),
      },
      {
        path: 'issues',
        lazy: async () => ({ Component: (await import('@/pages/IssuesPage')).IssuesPage }),
      },
      {
        path: 'issues/:id',
        lazy: async () => ({ Component: (await import('@/pages/IssueDetailPage')).IssueDetailPage }),
      },
      {
        path: 'knowledge',
        lazy: async () => ({ Component: (await import('@/pages/KnowledgePage')).KnowledgePage }),
      },
      {
        path: 'knowledge/:slug',
        lazy: async () => ({ Component: (await import('@/pages/ArticleDetailPage')).ArticleDetailPage }),
      },
      {
        path: 'community',
        lazy: async () => ({ Component: (await import('@/pages/CommunityPage')).CommunityPage }),
      },
      {
        path: 'search',
        lazy: async () => ({ Component: (await import('@/pages/SearchPage')).SearchPage }),
      },
      {
        path: 'ask',
        lazy: async () => ({ Component: (await import('@/pages/AskPage')).AskPage }),
      },
      {
        path: 'login',
        lazy: async () => ({ Component: (await import('@/pages/auth/LoginPage')).LoginPage }),
      },
      {
        path: 'register',
        lazy: async () => ({ Component: (await import('@/pages/auth/RegisterPage')).RegisterPage }),
      },
      {
        path: 'forgot-password',
        lazy: async () => ({ Component: (await import('@/pages/auth/ForgotPasswordPage')).ForgotPasswordPage }),
      },
      {
        path: 'profile/:username',
        lazy: async () => ({ Component: (await import('@/pages/ProfilePage')).ProfilePage }),
      },
      {
        path: 'settings',
        lazy: async () => ({ Component: (await import('@/pages/SettingsPage')).SettingsPage }),
      },
      {
        path: 'bookmarks',
        lazy: async () => ({ Component: (await import('@/pages/BookmarksPage')).BookmarksPage }),
      },
      {
        path: 'my-contributions',
        lazy: async () => ({ Component: (await import('@/pages/ContributionsPage')).ContributionsPage }),
      },
      {
        path: 'create',
        lazy: async () => ({ Component: (await import('@/pages/CreatePage')).CreatePage }),
      },
      {
        path: 'create/post',
        lazy: async () => ({ Component: (await import('@/pages/CreatePostPage')).CreatePostPage }),
      },
      {
        path: 'create/issue',
        lazy: async () => ({ Component: (await import('@/pages/CreateIssuePage')).CreateIssuePage }),
      },
      {
        path: 'create/article',
        lazy: async () => ({ Component: (await import('@/pages/CreateArticlePage')).CreateArticlePage }),
      },
      {
        path: 'admin',
        lazy: async () => ({ Component: (await import('@/pages/admin/AdminDashboard')).AdminDashboard }),
      },
      {
        path: 'admin/issues',
        lazy: async () => ({ Component: (await import('@/pages/admin/AdminIssuesPage')).AdminIssuesPage }),
      },
      {
        path: 'admin/content',
        lazy: async () => ({ Component: (await import('@/pages/admin/AdminContentPage')).AdminContentPage }),
      },
      {
        path: 'admin/reports',
        lazy: async () => ({ Component: (await import('@/pages/admin/AdminReportsPage')).AdminReportsPage }),
      },
      {
        path: 'admin/users',
        lazy: async () => ({ Component: (await import('@/pages/admin/AdminUsersPage')).AdminUsersPage }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).NotFoundPage }),
      },
    ],
  },
])
