import { useQuery } from '@tanstack/react-query'

const API_BASE = '/api'

export interface ProductImage {
  id: string
  url: string
  imgUrl: string
}

export interface ProductCategory {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  images: ProductImage[]
}

export interface FetchProductsOptions {
  random?: boolean
  ids?: string[]
  limit?: number
}

export const CATEGORY_MAP: Record<string, string> = {
  'Nhựa Nano': '9ea33d43-a9af-48f0-a9b9-f46f8b7cd2c3',
  'Tấm PVC': '0ae4ef5a-3152-4568-88dc-c3aeaf7f607a',
  'Lam sóng': '4aa9c891-0057-4c57-90ee-dde4bb95814f',
  'Than tre': '76417d0c-cc74-4f9d-85e2-b7113aeb0d92',
}

export const PRODUCT_CATEGORY_ORDER: string[] = ['Nhựa Nano', 'Tấm PVC', 'Lam sóng', 'Than tre']

/** Hiển thị "Lam sóng" thay cho "Lam sóng ngoài trời" và các biến thể tương tự */
export function getDisplayCategoryName(name: string): string {
  const n = name.trim().toLowerCase()
  if (n.includes('lam') && n.includes('sóng')) return 'Lam sóng'
  return name
}

async function fetchAllProducts(options?: FetchProductsOptions): Promise<Product[]> {
  const params = new URLSearchParams()
  if (options?.random !== undefined) params.append('random', String(options.random))
  if (options?.limit !== undefined) params.append('limit', String(options.limit))
  if (options?.ids && options.ids.length > 0) params.append('ids', options.ids.join(','))

  const qs = params.toString()
  const url = `${API_BASE}/products${qs ? `?${qs}` : ''}`

  const res = await fetch(url, { headers: { accept: '*/*' } })
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
  return res.json()
}

async function fetchProductsByCategory(
  categoryId: string,
  options?: FetchProductsOptions,
): Promise<Product[]> {
  const params = new URLSearchParams()
  if (options?.random !== undefined) params.append('random', String(options.random))
  if (options?.limit !== undefined) params.append('limit', String(options.limit))
  if (options?.ids && options.ids.length > 0) params.append('ids', options.ids.join(','))

  const qs = params.toString()
  const url = `${API_BASE}/products/category/${categoryId}${qs ? `?${qs}` : ''}`

  const res = await fetch(url, {
    headers: { accept: '*/*' },
  })
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
  return res.json()
}

async function fetchProductById(productId: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${productId}`, { headers: { accept: '*/*' } })
    if (res.ok) return res.json()
    // Fallback: fetch all products and find by id (if API has no /products/:id)
    const all = await fetchAllProducts()
    return all.find((p) => p.id === productId) ?? null
  } catch {
    try {
      const all = await fetchAllProducts()
      return all.find((p) => p.id === productId) ?? null
    } catch {
      return null
    }
  }
}

export function useProducts(categoryId?: string, options?: FetchProductsOptions) {
  return useQuery<Product[]>({
    queryKey: categoryId ? ['products', 'category', categoryId, options] : ['products', options],
    queryFn: () => (categoryId ? fetchProductsByCategory(categoryId, options) : fetchAllProducts(options)),
  })
}

export function useProduct(productId: string | undefined) {
  return useQuery<Product | null>({
    queryKey: ['product', productId],
    queryFn: () => (productId ? fetchProductById(productId) : Promise.resolve(null)),
    enabled: !!productId,
  })
}
