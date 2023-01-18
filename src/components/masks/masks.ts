

export function currency ( e: React.FormEvent<HTMLInputElement> ) {
    let value = e.currentTarget.value;
    
    // value = value.replace( /\D/g, "" );
    // value = value.replace( /(\d)(\d{2})$/  , "$1,$2" );
    // value = value.replace( /^([^\d\s]{1,}\s?[+-]?)(\d{1,3})(\,\d{3})*(\.\d{1,})?$/g , ',' );
    // return e.currentTarget.value = value;

    return value;
  }

 