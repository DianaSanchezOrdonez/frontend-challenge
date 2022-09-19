export interface PaginationProps {
  totalPages: number
  currentPage: number
  maxPageLimit: number
  minPageLimit: number
  onPrevClick: any
  onNextClick: any
  onPageChange: any
}
