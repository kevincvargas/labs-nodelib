import { IRequest } from './contracts';
import { Router } from 'express';
import express from 'express'
import { IMiddleware } from './contracts';

interface IRouteResource {
  controller: any
  router: Router
  middlewares?: IMiddleware[]
}

interface IHandleMiddleware {  
  router: Router
  middlewares: IMiddleware[]
}

const handleMiddlewares = ({router, middlewares}: IHandleMiddleware) => {
  middlewares.map(middleware => {
    router.use(middleware)
  })
}

const getIdParam = (req: IRequest) => {
  const { id } = req.params
  return id
}

/**
 * Implements the CRUD resources for route
 */
const resource = ({ controller, router, middlewares }: IRouteResource) => {
  if (middlewares) {
    handleMiddlewares({ router, middlewares })
  }

  router.post('/', (req, res) => {
    new controller().create(req, res)
  })

  router.get('/', (req, res) => {
    new controller().get(req, res)
  })
  
  router.get('/:id', (req, res) => {    
    new controller().show(getIdParam(req), req, res)
  })
  
  router.put('/:id', (req, res) => {    
    new controller().update(getIdParam(req), req, res)
  })
  
  router.delete('/:id', (req, res) => {    
    new controller().destroy(getIdParam(req), req, res)
  })
}

const httpRouter = Object.assign({}, Router(), {
  resource,
  handleMiddlewares
})

const httpServer = express

export { httpRouter, httpServer }