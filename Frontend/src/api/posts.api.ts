import { delay, paginate } from '@/lib/utils'
import { comments, getPostById, posts } from '@/mocks/posts'
import { currentUser } from '@/mocks/users'
import type { Comment, CreatePostPayload, Paginated, Post } from '@/types'
import { apiClient } from './client'

export async function getPosts(page = 1, pageSize = 12): Promise<Paginated<Post>> {
  if (apiClient.useMock) {
    await delay(280)
    return paginate(posts, page, pageSize)
  }
  return apiClient.get(`/api/posts?page=${page}&pageSize=${pageSize}`)
}

export async function getPost(id: string): Promise<Post> {
  if (apiClient.useMock) {
    await delay(200)
    const post = getPostById(id)
    if (!post) throw new Error('Post not found')
    return post
  }
  return apiClient.get(`/api/posts/${id}`)
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  if (apiClient.useMock) {
    await delay(400)
    const post: Post = {
      id: crypto.randomUUID(),
      author: currentUser,
      type: payload.type,
      content: payload.content,
      media: payload.mediaUrls.map((url) => ({
        id: crypto.randomUUID(),
        kind: 'IMAGE',
        url,
        createdAt: new Date().toISOString(),
      })),
      tags: payload.tags,
      district: payload.district,
      likeCount: 0,
      commentCount: 0,
      likedByMe: false,
      savedByMe: false,
      createdAt: new Date().toISOString(),
    }
    posts.unshift(post)
    return post
  }
  return apiClient.post('/api/posts', payload)
}

export async function likePost(id: string): Promise<{ liked: boolean; likeCount: number }> {
  if (apiClient.useMock) {
    await delay(150)
    const post = getPostById(id)
    if (!post) throw new Error('Post not found')
    post.likedByMe = !post.likedByMe
    post.likeCount += post.likedByMe ? 1 : -1
    return { liked: post.likedByMe, likeCount: post.likeCount }
  }
  return apiClient.post(`/api/posts/${id}/like`)
}

export async function getComments(postId: string): Promise<Comment[]> {
  if (apiClient.useMock) {
    await delay(180)
    return comments.filter((c) => c.postId === postId)
  }
  return apiClient.get(`/api/posts/${postId}/comments`)
}
