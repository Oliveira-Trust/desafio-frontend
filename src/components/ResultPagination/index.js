import React, { useState } from "react";

import { Col, Row, Pagination } from 'react-bootstrap';
import { useSelector } from "react-redux";

//TODO: Mudar o nome para ResultFooter
const ResultPagination = ({ totalItems, itemsPerPage, onPageChange }) => {

  const total = useSelector((state) => Array.isArray(state.wallet.wallets) ? state.wallet.wallets.length : 0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  
  return (
    <>
      <hr className="mt-5 mb-4" />
      <Row>
        <Col>
          { total } registro(s)
        </Col>
        <Col className="d-flex justify-content-end">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Pagination.Item 
                key={page} 
                active={page === currentPage} 
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </>
  );
}

export default ResultPagination;