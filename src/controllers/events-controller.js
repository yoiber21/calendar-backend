import { response } from 'express';
import EventModel from '../models/Event-model';


const getEvents = async( req, res = response ) => {

    const eventos = await EventModel.find().populate('user', 'name');

    return  res.status(200).json({
        error: false,
        eventos
    })
}

const createEvents = async( req, res = response ) => {


    const evento = new EventModel( req.body );

    try {
        
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        return res.status(201).json({
            error: false,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
        })
    }

}


const updateEvents = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const evento =  await EventModel.findById( eventoId ); 
        if ( !evento ) {
             return res.status(404).json({
                error: false,
                msg: 'No existe este envento en la base de datos'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                error: false,
                msg: 'No tienes privilegio para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }


        const eventUpdated = await EventModel.findByIdAndUpdate( eventoId, newEvent, { new: true } );

        return res.status(200).json({
            error: false,
            evento: eventUpdated
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
        })
    }
}

const deleteEvents = async( req, res = response ) => {
 
    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const evento =  await EventModel.findById( eventoId ); 
        if ( !evento ) {
             return res.status(404).json({
                error: false,
                msg: 'No existe este envento en la base de datos'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                error: false,
                msg: 'No tienes privilegio para eliminar este evento'
            });
        }




        await EventModel.findByIdAndDelete( eventoId );

        return res.status(200).json({
            error: false,
            evento: 'Eliminado'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
        })
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents,
}