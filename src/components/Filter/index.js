import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Search } from 'react-bootstrap-icons';
import { Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import { StyledFormControl } from './style';

import { setEmail, setNome, setSobrenome } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  
  // state para controle da informação no form
  // para previnir o consumo desnecessário da API 
  const [inputNome, setInputNome] = useState('');
  const [inputSobrenome, setInputSobrenome] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  // update do redux para promover a informação para
  // os outros componentes
  const handleSearch = () => {
    dispatch(setNome(inputNome.trim()));
    dispatch(setSobrenome(inputSobrenome.trim()));
    dispatch(setEmail(inputEmail.trim()));
  };

  return (
    <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <Container>
        <Row>
          <Col>
            <div className='p-3 mb-4 rounded shadow bg-white'>
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Nome">
                    <StyledFormControl type="text" placeholder='Nome' value={inputNome} onChange={(e) => setInputNome(e.target.value)} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingPassword" label="Sobrenome">
                    <StyledFormControl type="text" placeholder="Sobrenome" value={inputSobrenome} onChange={(e) => setInputSobrenome(e.target.value)} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingPassword" label="E-mail">
                    <StyledFormControl type="email" placeholder="E-mail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                  </FloatingLabel>
                </Col>
                <Col xs={2} className='d-grid gap-2'>
                  <Button type="submit" variant="outline-primary" onClick={handleSearch}>
                    <Search />
                    &nbsp;&nbsp;<strong>Buscar</strong>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default Filter;
