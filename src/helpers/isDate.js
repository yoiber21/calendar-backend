import moment from 'moment';


const isDate = ( value ) =>  {  
    
    if ( !value )return false;

    const fecha = moment( value );

    return ( fecha.isValid() ) ?  true :  false;

    // if ( fecha.isValid() ) return true;
    // else return false;
    
}

export default isDate;
