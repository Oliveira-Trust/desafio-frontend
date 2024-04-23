import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { setModalWallet } from "../../redux/modalSlice";


const Wallet = () => {
  const dispatch = useDispatch();
  const handleShow = () => dispatch(setModalWallet({ opened: true, id: '' }));

  return (
    <Container>
      <Row>
        <Col>
          <h2 className='mt-5 mb-4 fw-bold fs-4'>
            BTC Carteiras
          </h2>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='mt-5 mb-4 px-4 py-2 btn btn-primary' onClick={handleShow}>
            Adicionar Carteira
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;
