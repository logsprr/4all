import express from 'express';

const routes = express.Router();

import { AuthToken } from '../services/Auth';

import { UserController } from '../controllers/User';
import { MovieController } from '../controllers/Movie';
import { StoreController } from '../controllers/Store';
import { AuthController } from '../controllers/Auth';

const authToken = new AuthToken();

const userController = new UserController();
const movieController = new MovieController();
const storeController = new StoreController();
const authController = new AuthController();

//Rota de login
routes.get('/login/verify/token', authController.verifyToken);
routes.post('/login/auth', authController.login);
//Rota dos usuários
routes.route('/users')
    .get(authToken.AuthUser, userController.getAll)
    .post(userController.save)
routes.route('/users/:id')
    .get(authToken.AuthUser, userController.getById)
    .post(authToken.AuthUser, userController.updateById)
    .delete(authToken.AuthUser, userController.delete)
routes.get('/users/search/:key', authToken.AuthUser, userController.getByKey)
//Rota dos filmes
routes.route('/movies')
    .get(authToken.AuthUser, movieController.getAll)
    .post(authToken.AuthUser, movieController.save)
routes.route('/movies/:id')
    .get(authToken.AuthUser, movieController.getById)
    .post(authToken.AuthUser, movieController.updateById)
    .delete(authToken.AuthUser, movieController.delete)
routes.route('/movies/user/rent')
    .post(authToken.AuthUser, movieController.getRent)
    .delete(authToken.AuthUser, movieController.deleteRent)

routes.get('/movies/search/:key', authToken.AuthUser, movieController.getByKey)

//Rota das locadoras
routes.route('/stores')
    .get(authToken.AuthUser, storeController.getAll)
    .post(authToken.AuthUser, storeController.save)
routes.route('/stores/:id')
    .get(authToken.AuthUser, storeController.getById)
    .post(authToken.AuthUser, storeController.updateById)
    .delete(authToken.AuthUser, storeController.delete)

export default routes;