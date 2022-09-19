import { FetchAllHitsResponse } from '../interfaces/fetchAllHitsResponse'

const baseUrl = 'https://hn.algolia.com/api/v1'

export const fetchAllHits = async (technology: string, page: number): Promise<FetchAllHitsResponse> => {
  const res = await fetch(`${baseUrl}/search_by_date?query=${technology}&page=${page}`)

  return res.json()
}