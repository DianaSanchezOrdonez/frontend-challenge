import { Hit } from '../interfaces/fetchAllHitsResponse'

export const fetchFavoriteHits = (): Hit[] => {
  const favoritesData = JSON.parse(localStorage.getItem('favorites') ?? '')

  return favoritesData
}
