/* se importa el modulo app */
import app from './app';
import dotenv from 'dotenv';

/* se crea la funcion principal que es la que va a levantar el servidor */
dotenv.config();
const main = async() =>{
    const port = process.env.PORT
    await app.listen(port)
    console.log(`Servidor corriendo en el puerto ${port}`);
}

main();
