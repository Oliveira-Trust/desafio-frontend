import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setModalWallet } from "../../redux/modalSlice";

import { useQuery } from 'react-query';

import { Button, Modal, FloatingLabel, Form, Col, Row} from 'react-bootstrap';
import { setBid } from "../../redux/bidSlice";
import { createWalletAddress } from "../../utils/walletAddress";

import { fetchBTCToBRL, fetchNewWallet, fetchEditWallet } from "../../services/api";

import CurrencyInput from "react-currency-input-field";

const ModalWallet = () => {
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [valorCompra, setValorCompra] = useState(0);
  const [valorCompraBtc, setValorCompraBtc] = useState(0);
  const [abertura, setAbertura] = useState('');
  const [enderecoCarteira, setEnderecoCarteira] = useState('');

  const show = useSelector(state => state.modal.modalWallet.opened);
  const idWallet = useSelector(state => state.modal.modalWallet.id);
  const bid = useSelector(state => state.bid.bid);
  const wallets = useSelector(state => state.wallet.wallets)

  const { data } = useQuery(
    ['btcToBrl'], () => fetchBTCToBRL()
  );

  const handleValueChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    setValorCompra(parseFloat(numericValue) / 100);
  };

  useEffect(() => {
    if (data && data.BTCBRL) {
      dispatch(setBid(data.BTCBRL));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setValorCompraBtc(valorCompra / bid)
  }, [valorCompra, bid]);

  useEffect(() => {
    if (idWallet !== '') {

      const _wl = wallets.filter((wallet) => wallet.id === idWallet)

      setNome(_wl[0].nome);
      setSobrenome(_wl[0].sobrenome);
      setEmail(_wl[0].email);
      setAbertura(_wl[0].data_abertura);
      setValorCompra(_wl[0].valor_carteira * bid);
      setEnderecoCarteira(_wl[0].endereco_carteira)
    } 
  }, [idWallet, wallets, bid]);

  const handleCreate = () => {
    const payload = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      data_abertura: new Date().toISOString(),
      valor_carteira: valorCompraBtc,
      endereco_carteira: createWalletAddress(),
    }

    fetchNewWallet(payload);
    handleClose();
  }

  const handleEdit = () => {
    const payload = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      data_abertura: abertura,
      valor_carteira: valorCompraBtc,
      endereco_carteira: enderecoCarteira,
    }

    fetchEditWallet(idWallet, payload);
    handleClose();
  }
  
  const handleClose = () => { 
    dispatch(setModalWallet({opened: false, id: ''}));

    setNome('');
    setEmail('');
    setSobrenome('');
    setValorCompra(0);
    setValorCompraBtc(0);
  }

    return (
      <>  
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Adicionar Carteira</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                  <Form.Control type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Sobrenome" className="mb-3">
                  <Form.Control type="text" placeholder='Sobrenome' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3">
                  <Form.Control type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Valor de compra">
                  <CurrencyInput
                    id="valorCompra"
                    name="valorCompra"
                    placeholder="Valor de compra"
                    value={valorCompra}
                    decimalsLimit={2}
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    onValueChange={(value, name) => handleValueChange(value ? value : '0', name)}
                    className="form-control"
                  />
                </FloatingLabel>
              </Col>
              <Col className="d-flex align-items-center">
                <span className="">BTC {valorCompraBtc.toLocaleString('pt-BR', {minimumFractionDigits: 6, maximumFractionDigits: 6})}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light bg-white" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => (idWallet === '' ? handleCreate() : handleEdit())}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalWallet;