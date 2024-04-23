import React, { useEffect, useState } from 'react';
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
  const editUpdate = useSelector(state => state.modal.modalWallet.opened);
  const deleteUpdate = useSelector(state => state.modal.modalDelete.opened);
  
  const { isLoading, error, data, refetch } = useQuery(
    ['wallets', nome, sobrenome, email], () => fetchUserData(nome, sobrenome, email)
  );

  useEffect(() => {
    if(data) dispatch(setWallets(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (!editUpdate && !deleteUpdate) refetch();
  }, [deleteUpdate, editUpdate, refetch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const handleShowModalEdit = (id) => dispatch(setModalWallet({ opened: true, id: id}));
  const handleShowModalDelete = (id) => dispatch(setModalDelete({ opened: true, id: id}));
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container>
      <Row>
        <Col>
          <div className='p-3 mb-4 rounded shadow bg-white'>
            <ResultHeader />
            { isLoading && <div className='d-flex justify-content-center'><div className="spinner-border my-5" role="status"></div></div>}
            { error && <div className="alert alert-danger" role="alert">Ops! Ocorreu um erro, por favor recarregue a página.</div>}
            {currentItems && currentItems.length > 0 && (
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
                  {currentItems.map((wallet, index) => (
                    <tr key={index}>
                      <td className='py-3'>{wallet.nome}</td>
                      <td>{wallet.sobrenome}</td>
                      <td>{wallet.email}</td>
                      <td>{wallet.valor_carteira.toLocaleString('pt-BR', {minimumFractionDigits: 6, maximumFractionDigits: 6})}</td>
                      <td align='right'>
                        <OverlayTrigger placement="bottom" overlay={tooltipEdit}>
                          <Button onClick={() => handleShowModalEdit(wallet.id)} variant="light" className='bg-transparent border-0 rounded-circle'>
                            <Pencil />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={tooltipDelete}>
                          <Button onClick={() => handleShowModalDelete(wallet.id)} variant="light" className='bg-transparent border-0 rounded-circle'>
                            <Trash />
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <ResultPagination totalItems={data ? data.length : 0} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
