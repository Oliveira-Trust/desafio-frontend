import React, { useEffect } from 'react';
import { Container, Row, Col, Table, OverlayTrigger, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { tooltipEdit, tooltipDelete } from '../Tooltip';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { setWallets } from '../../redux/walletSlice';
import { setModalWallet, setModalDelete } from "../../redux/modalSlice";
import { fetchUserData } from '../../services/api';

import ResultHeader from '../ResultHeader';
import ResultPagination from '../ResultPagination';

const Result = () => {
  const dispatch = useDispatch();

  const { nome, sobrenome, email } = useSelector((state) => state.filter);
  
  const handleShowModalEdit = () => dispatch(setModalWallet(true));
  const handleShowModalDelete = () => dispatch(setModalDelete(true));
  
  const { isLoading, error, data } = useQuery(
    ['wallets', nome, sobrenome, email], () => fetchUserData(nome, sobrenome, email)
  );

  useEffect(() => {
    if(data) {
      dispatch(setWallets(data));
    }
  }, [data, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <div className='p-3 mb-4 rounded shadow bg-white'>

            <ResultHeader />

            { isLoading && (
              <div className='d-flex justify-content-center'>
                <div className="spinner-border my-5" role="status"></div>
              </div>
            )}

            { error && (
              <div class="alert alert-danger" role="alert">
                Ops! Ocorreu um erro, por favor recarregue a página.
              </div>
            )}
            
            {data && data.length > 0 && (
              <Table striped hover className='align-middle borderless'>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>E-mail</th>
                    <th>Bitcoin</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((wallet, index) => (
                    <tr key={index}>
                      <td className='py-3'>{wallet.nome}</td>
                      <td>{wallet.sobrenome}</td>
                      <td>{wallet.email}</td>
                      <td>{wallet.valor_carteira}</td>
                      <td>
                        <OverlayTrigger placement="bottom" overlay={tooltipEdit}>
                          <Button onClick={handleShowModalEdit} variant="light" className='bg-transparent border-0 rounded-circle'>
                            <Pencil />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={tooltipDelete}>
                          <Button onClick={handleShowModalDelete} variant="light" className='bg-transparent border-0 rounded-circle'>
                            <Trash />
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <ResultPagination />

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
