
import { useState, useEffect } from 'react';

import api from '../connect/axios';
import axios from 'axios';

import { users } from '../model/users';

export const useWallet = ( ) => {
  const [ data, setData ] = useState < users[ ] > ( [ ] );
  const [ dataById, setDataById ] = useState < users > (  );

  const [ exchange, setExchange ] = useState < any > ( );
  const [ quotation, setQuotation ] = useState < number | any > ( );

  const [ loading, setLoading ] = useState( false );

  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ walletsPerPage ] = useState( 10 );

  const indexOfLastWallet = currentPage * walletsPerPage;
  const indexOfFirstWallet = indexOfLastWallet - walletsPerPage;
  const currentWallets = data.slice( indexOfFirstWallet, indexOfLastWallet );

  useEffect( ( ) => {
    getData( );
  }, [ ] );

  const paginate = ( pageNumber: number ) => setCurrentPage( pageNumber );

  const getData = async ( ) => {
    try {
      setLoading( true );
      const res = await api.get<users>('/users');
      if( Array.isArray( res.data ) ) {
        setData( res.data );
        setLoading( false );
        return res;
      }
    } catch ( e ) {
      const typedError = e as Error;
      return typedError;
    }
  };

  const getDataByUserId = async ( id: string ) => {
    try {
      const res = await api.get<users>(`/users/${ id }`);
        setDataById( res.data );
        return res;
    } catch ( e ) {
        const typedError = e as Error;
        return typedError;
    }
  };

  const currency = async ( ) => {
    try {
      const res = await axios.get( 'http://economia.awesomeapi.com.br/json/last/BTC-BRL' );
        if( res.data.BTCBRL.bid !== null ) {
          let btc_quotation = res.data.BTCBRL.bid;
          setQuotation( btc_quotation );
          btcToReal( btc_quotation, dataById?.valor_carteira );
          return res;
        }
    } catch( e ) {
        const typedError = e as Error;
        return typedError;
    }
  }

  const btcToReal = ( quotation: number, wallet_value: number ) => {
    let calc = ( quotation * wallet_value ) * 1000;
    let str: any = calc.toLocaleString( 'pt-BR', { minimumFractionDigits: 2 } ).toString( );
    setExchange( str );
  }
  
  const realToBtc = ( quotation: number, buy_price: number ) => {
    let calc = ( parseFloat( ` ${ quotation } ` ) * parseFloat( ` ${ buy_price } ` ) );
    let str = calc.toLocaleString( 'pt-BR', { minimumFractionDigits: 7 } );
    return str;
  }

  return {
    data,
      setData,
        getData,
          dataById,
            currency,
              exchange,
                quotation,
                  getDataByUserId,
                        btcToReal,
                          realToBtc,
                            currentPage,
                              walletsPerPage,
                                currentWallets,
                                        paginate,
                    
  }
}