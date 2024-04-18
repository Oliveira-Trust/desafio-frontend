import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Filter = () => {
  return (
    <Container>
      <Row>
        <Col>
          Nome
        </Col>
        <Col>
          Sobrenome
        </Col>
        <Col>
          E-mail
        </Col>
        <Col>
          Busca
        </Col>
      </Row>
    </Container>
  );
};

export default Filter;
