import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { exportToCSV } from '../../utils/exportToCSV';

import { useSelector } from "react-redux";

const ResultHeader = () => {
  const data = useSelector(state => state.wallet.wallets);
 
  return (
    <Row className='mt-4 mb-3'>
      <Col>
        <h3 className='fw-bold fs-5'>Carteiras</h3>
      </Col>
      <Col xs={2} className='d-grid gap-2'>
        <Button type="submit" variant="outline-primary" onClick={() => exportToCSV(data)}>
          <strong>Exportar CSV</strong>
        </Button>
      </Col>
    </Row>
  );
}

export default ResultHeader;