const Pagination = (props: {
  totalPages: number
  currentPage: number
  maxPageLimit: number
  minPageLimit: number
  onPrevClick: any
  onNextClick: any
  onPageChange: any
}) => {
  const { currentPage, maxPageLimit, minPageLimit } = props
  const totalPages = props.totalPages - 1

  // build page numbers list based on total number of pages
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

  // page ellipses
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
        <li className='btn-prev' onClick={handlePrevClick}>
          <i className='fa fa-angle-left'></i>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li className='btn-next' onClick={handleNextClick}>
          <i className='fa fa-angle-right'></i>
        </li>
      </ul>

      {/* <div className='main'>
        <ul className='pageNumbers'>
          <li>
            <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
              Prev
            </button>
          </li>
          {pageDecremenEllipses}
          {pageNumbers}
          {pageIncrementEllipses}
          <li>
            <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>
              Next
            </button>
          </li>
        </ul>
      </div> */}
    </section>
  )
}

export default Pagination
