import { FetchAllHitsResponse, Hit } from '../interfaces/fetchAllHitsResponse'

const baseUrl = 'https://hn.algolia.com/api/v1'

export const fetchAllHits = async (technology: string, page: number): Promise<FetchAllHitsResponse> => {
  const res = await fetch(`${baseUrl}/search_by_date?query=${technology}&page=${page}`)
  // console.log('testing', await res.json())
  // hitsPerPage: 20
  // nbHits: 5867
  // nbPages: 50
  // page: 0
  return res.json()
}