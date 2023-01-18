
import React, { InputHTMLAttributes, useCallback, useRef } from "react";

import { currency } from "./masks";

import '../../components/modals/create/createWallet.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask:"currency"
}

const MaskedInput: React.FC<InputProps> = ( { mask, ...props } ) => {

  const handleKeyUp = useCallback(
    ( e: React.FormEvent < HTMLInputElement > ) => {
      if ( mask === "currency" ) {
        currency( e );
      }
    },
    [ mask ]
  );

  return <input { ...props } onKeyUp={ handleKeyUp } placeholder='Valor De Compra' />

};

export default MaskedInput;