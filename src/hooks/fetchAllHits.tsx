import { useEffect, useState } from 'react'
import { fetchAllHits } from '../helpers/fetchAllHits'
import { FetchAllHitsResponse } from '../interfaces/fetchAllHitsResponse'

export const useHit = (technology: string, page: number) => {
  const [data, setData] = useState<FetchAllHitsResponse>()

  useEffect(() => {
    // loading data
    fetchAllHits(technology, page).then((data) => setData(data))
  }, [technology, page])

  return {
    data,
  }
}
