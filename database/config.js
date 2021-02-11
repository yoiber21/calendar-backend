import mongoose from 'mongoose';


const dbConnection = async() =>{

    await mongoose.connect('mongodb+srv://yoiber:hkebQTInc5rGXtSG@cluster0.g1uvx.mongodb.net/mern_calendar', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {console.log(`Conexion a BD establecida`);}).catch(err => {
        return console.log(err);
    })
            
}

export default dbConnection;