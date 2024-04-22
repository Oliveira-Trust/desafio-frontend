import React from "react";

import { Col, Row, Pagination } from 'react-bootstrap';
import { useSelector } from "react-redux";

//TODO: Mudar o nome para ResultFooter
const ResultPagination = () => {

  const total = useSelector((state) => Array.isArray(state.wallet.wallets) ? state.wallet.wallets.length : 0);
  const active = 1;
  const items = [];

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  
  return (
    <>
      <hr className="mt-5 mb-4" />
      <Row>
        <Col>
          { total } registro(s)
        </Col>
        <Col className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev />
            { items }
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>
    </>
  );
}

export default ResultPagination;