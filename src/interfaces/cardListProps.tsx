import { FetchAllHitsResponse, Hit } from './fetchAllHitsResponse'

export interface CardListProps {
  data: FetchAllHitsResponse
  favorites: Hit[]
  handleFavorites: any
}
