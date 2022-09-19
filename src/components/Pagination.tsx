import { PaginationProps } from '../interfaces/paginationProps'

const Pagination = (props: PaginationProps) => {
  const { currentPage, maxPageLimit, minPageLimit } = props
  const totalPages = props.totalPages - 1

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const handlePrevClick = () => {
    props.onPrevClick()
  }

  const handleNextClick = () => {
    props.onNextClick()
  }

  const handlePageClick = (e: any) => {
    props.onPageChange(Number(e.target.id))
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page.toString()}
          onClick={handlePageClick}
          className={currentPage === page ? 'active' : undefined}
        >
          {page}
        </li>
      )
    } else {
      return null
    }
  })

  let pageIncrementEllipses = null
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
  }
  let pageDecremenEllipses = null
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
  }

  return (
    <section className='pagination'>
      <ul>
        <li className={currentPage === pages[0] ? 'disable' : ''} onClick={handlePrevClick}>
          <i className='fa fa-angle-left'></i>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li className={currentPage === pages[pages.length - 1] ? 'disable' : ''} onClick={handleNextClick}>
          <i className='fa fa-angle-right'></i>
        </li>
      </ul>
    </section>
  )
}

export default Pagination
