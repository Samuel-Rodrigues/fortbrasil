import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController';
import EstablishmentControlle from './app/controllers/EstablishmentsController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

//            ROTAS

//Sessao
routes.post('/session', SessionController.store)

//USER
routes.post('/users', UserController.store)
routes.get('/user', authMiddleware, UserController.show)
routes.get('/users', authMiddleware, UserController.index)
routes.put('/users', authMiddleware, UserController.update)
routes.delete('/users/:id?', authMiddleware, UserController.delete)

//ESTABLISHMENTS
routes.get('/establishments', authMiddleware, EstablishmentControlle.index)
routes.post('/establishments', authMiddleware, EstablishmentControlle.store)
routes.put('/establishments/:id', authMiddleware, EstablishmentControlle.update)
routes.delete('/establishments/:id?', authMiddleware, EstablishmentControlle.delete)

export default routes