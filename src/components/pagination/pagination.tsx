
import '../pagination/pagination.css';

type pagination = {
  walletsPerPage: number,
  totalWallets: number,
  paginate: ( value: number ) => void
}

const Pagination = ( { walletsPerPage, totalWallets , paginate } : pagination ) => {
  const pageNumbers = [ ];

  for ( let a = 1; a <= Math.ceil( totalWallets / walletsPerPage ); a++ ) {
    pageNumbers.push( a );
  }

return (
    <ul className='pagination'>
      {pageNumbers.map( ( page: number ) => (
        <li key={ page }>
          <a onClick={ ( ) => paginate( page ) } href='!#' className='page-link'>
            { page }
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;