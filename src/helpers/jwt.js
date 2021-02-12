import jwt from 'jsonwebtoken';

const generateJwt = ( uid, name ) => {

    return new Promise(( resolve, reject )=>{

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, ( err, token )=>{
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            }

            resolve( token )
        } );

    })
}


export default generateJwt;