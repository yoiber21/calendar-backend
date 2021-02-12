/*  Ruta
    /api/events 
*/

import { Router } from 'express';
import { check } from 'express-validator';
import EventsController from '../controllers/events-controller';
import isDate from '../helpers/isDate';
import validateFields from '../middlewares/ validate-fields'
import validateJwt from '../middlewares/validate-jwt';


const router = Router();
router.use( validateJwt )

// Obtener eventos
router.get('/',  EventsController.getEvents);

// Crear eventos
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
    validateFields
] ,  EventsController.createEvents);

// Actualizar eventos
router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
    validateFields,
] , EventsController.updateEvents);

// Eliminar eventos
router.delete('/:id',  EventsController.deleteEvents)

export default router;