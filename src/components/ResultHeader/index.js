import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ResultHeader = () => {
 return (
  <Row className='mt-4 mb-3'>
    <Col>
      <h3 className='fw-bold fs-5'>Carteiras</h3>
    </Col>
    <Col xs={2} className='d-grid gap-2'>
      <Button type="submit" variant="outline-primary" onClick={() => false}>
        <strong>Exportar CSV</strong>
      </Button>
    </Col>
  </Row>
 );
}

export default ResultHeader;