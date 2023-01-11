
import { useState, useEffect } from 'react';
import api from '../connect/axios';

type props = {
  map: ( ) => void
  id: number
  users: {}
  nome: string
  sobrenome: string
  email: string
  endereço: string
  data_nascimento: string
  data_abertura: string
  valor_carteira: number | any
  endereco_carteira: string
}

export const useWallet = ( ) => {
  const [ data, setData ] = useState < props[ ] > ( [ ] );
  const [ dataById, setDataById ] = useState < props > (  );

  useEffect( ( ) => {
    getData( );
  }, [ ] );

  const getData = async ( ) => {
    try {
      const response = await api.get<props>('/users');
      if( Array.isArray( response.data ) ) {
        setData( response.data );
      }
    } catch ( e ) {
      const typedError = e as Error;
      return typedError;
    }
  };

  const getDataByUserId = async ( id: string ) => {
    try {
      const response = await api.get<props>(`/users/${ id }`);
        setDataById( response.data );
    } catch ( e ) {
        const typedError = e as Error;
        return typedError;
    }
  };

  return {
    data,
      getData,
        dataById,
          getDataByUserId
  }
}