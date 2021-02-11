import { response } from 'express';
import bcrypt from "bcrypt";
import UserModel from '../models/User-model';
import generateJwt from '../helpers/jwt';


const createUser = async(req, res = response ) =>{

    const {  email, password } = req.body;

    try {

        let userExist = await UserModel.findOne({ email });

        if ( userExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este email ya esta registrado'
            })
        }

        const user = new UserModel( req.body );

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generar token
        const token = await generateJwt( user.id, user.name );



        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }
       
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const  userExist = await UserModel.findOne({ email });

        if ( !userExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este email'
            })
        }

        // Confirmar los password

        const validPassword = bcrypt.compareSync( password, userExist.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar jsonWebtoken
        const token = await generateJwt( userExist.id, userExist.name );


        return res.status(200).json({
            ok: true,
            uid: userExist.id,
            name: userExist.name,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

}

const renewToken = async( req, res = response )=>{

    const { uid, name } = req;


    // Generar un  nuevo jwt y retornarlo en esta peticion

    const token = await generateJwt( uid, name );
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}
