import { useQuery } from '@tanstack/react-query'

const API_BASE = 'https://api.opnhuatuankiet.io.vn'

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

export const PROJECT_CATEGORY_MAP: Record<string, string> = {
  'Trần': '66f78ef9-14ec-429a-9f17-eb2d7f05e25f',
  'Phòng thờ': '7907a2d0-c5a2-4d2a-ac2d-2680365f50e2',
  'Phòng khách': '01338b05-735e-4fc5-b52d-46d7eb6fd26e',
  'Vách TV': '8cfbba31-c74b-4224-b0f2-3b5f8176ce76',
}

async function fetchAllProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/project`, { headers: { accept: '*/*' } })
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  return res.json()
}

async function fetchProjectsByCategory(categoryId: string): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/project/category/${categoryId}`, {
    headers: { accept: '*/*' },
  })
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  return res.json()
}

export function useProjects(categoryId?: string) {
  return useQuery<Project[]>({
    queryKey: categoryId ? ['projects', 'category', categoryId] : ['projects'],
    queryFn: () => (categoryId ? fetchProjectsByCategory(categoryId) : fetchAllProjects()),
  })
}
