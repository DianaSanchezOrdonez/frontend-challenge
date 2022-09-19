import { useEffect, useState } from 'react'
import { fetchFavoriteHits } from '../helpers/fetchFavoritesHits'
import { Hit } from '../interfaces/fetchAllHitsResponse'

export const useFavoriteHits = () => {
  const [favoriteData, setFavoriteData] = useState<Hit[]>()

  useEffect(() => {
    const favorites = fetchFavoriteHits()

    setFavoriteData(favorites)
  }, [])

  return {
    favoriteData,
  }
}
