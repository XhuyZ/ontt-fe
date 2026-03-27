import { useQuery } from '@tanstack/react-query'

const API_BASE = '/api'

export interface ProjectImage {
  id: string
  url: string
  imgUrl: string
}

export interface ProjectCategory {
  id: string
  name: string
}

export interface Project {
  id: string
  name: string
  projectCategory: ProjectCategory
  images: ProjectImage[]
}

export interface FetchProjectsOptions {
  random?: boolean
  ids?: string[]
  limit?: number
}

export const PROJECT_CATEGORY_MAP: Record<string, string> = {
  'Trần': '66f78ef9-14ec-429a-9f17-eb2d7f05e25f',
  'Phòng thờ': '7907a2d0-c5a2-4d2a-ac2d-2680365f50e2',
  'Phòng khách': '01338b05-735e-4fc5-b52d-46d7eb6fd26e',
  'Vách TV': '8cfbba31-c74b-4224-b0f2-3b5f8176ce76',
}

export const PROJECT_CATEGORY_ORDER: string[] = ['Trần', 'Phòng thờ', 'Phòng khách', 'Vách TV']

async function fetchAllProjects(options?: FetchProjectsOptions): Promise<Project[]> {
  const params = new URLSearchParams()
  if (options?.random !== undefined) params.append('random', String(options.random))
  if (options?.limit !== undefined) params.append('limit', String(options.limit))
  if (options?.ids && options.ids.length > 0) params.append('ids', options.ids.join(','))

  const qs = params.toString()
  const url = `${API_BASE}/project${qs ? `?${qs}` : ''}`

  const res = await fetch(url, { headers: { accept: '*/*' } })
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  return res.json()
}

async function fetchProjectsByCategory(
  categoryId: string,
  options?: FetchProjectsOptions,
): Promise<Project[]> {
  const params = new URLSearchParams()
  if (options?.random !== undefined) params.append('random', String(options.random))
  if (options?.limit !== undefined) params.append('limit', String(options.limit))
  if (options?.ids && options.ids.length > 0) params.append('ids', options.ids.join(','))

  const qs = params.toString()
  const url = `${API_BASE}/project/category/${categoryId}${qs ? `?${qs}` : ''}`

  const res = await fetch(url, {
    headers: { accept: '*/*' },
  })
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  return res.json()
}

async function fetchProjectById(projectId: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/project/${projectId}`, { headers: { accept: '*/*' } })
    if (res.ok) return res.json()
    const all = await fetchAllProjects()
    return all.find((p) => p.id === projectId) ?? null
  } catch {
    try {
      const all = await fetchAllProjects()
      return all.find((p) => p.id === projectId) ?? null
    } catch {
      return null
    }
  }
}

export function useProjects(categoryId?: string, options?: FetchProjectsOptions) {
  return useQuery<Project[]>({
    queryKey: categoryId ? ['projects', 'category', categoryId, options] : ['projects', options],
    queryFn: () => (categoryId ? fetchProjectsByCategory(categoryId, options) : fetchAllProjects(options)),
  })
}

export function useProject(projectId: string | undefined) {
  return useQuery<Project | null>({
    queryKey: ['project', projectId],
    queryFn: () => (projectId ? fetchProjectById(projectId) : Promise.resolve(null)),
    enabled: !!projectId,
  })
}
