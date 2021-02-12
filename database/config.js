import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async() =>{

    await mongoose.connect(process.env.DB_CNN , {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {console.log(`Conexion a BD establecida`);}).catch(err => {
        return console.log(err);
    })
            
}

export default dbConnection;