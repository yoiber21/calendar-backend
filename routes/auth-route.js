/*  Ruta
    /api/auth 
*/

import { Router } from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/auth-controller';
import validateFields from '../middlewares/ validate-fields'
import validateJwt from '../middlewares/validate-jwt';
const router = Router();

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseñadebe de ser de 6 caracteres o más').isLength({ min: 6 }),
    validateFields
] , 
UserController.createUser);

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseñadebe de ser de 6 caracteres o más').isLength({ min: 6 }),
        validateFields
    ]
,UserController.loginUser);

router.get('/renew',validateJwt ,UserController.renewToken);



export default router;