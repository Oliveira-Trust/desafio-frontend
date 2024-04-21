import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Title } from './style';

const Wallet = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Title className='mt-5 mb-4'>
            BTC Carteiras
          </Title>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='mt-5 mb-4 px-4 py-2 btn btn-primary'>
            Adicionar Carteira
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;
