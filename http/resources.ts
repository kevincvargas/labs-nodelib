import { IRequest } from '.';
import { Router } from 'express';
import { IMiddleware } from '.';

interface IRouteResource {
  controller: any
  router: Router
  middlewares?: IMiddleware[]
}

interface IHandleMiddleware {  
  router: Router
  middlewares: IMiddleware[]
}

/**
 * Add middleware for route resources
 */
 const handleMiddlewares = ({router, middlewares}: IHandleMiddleware) => {
  middlewares.map(middleware => {
    router.use(middleware)
  })
}

/**
 * Implements the CRUD resources for route
 */
const routeResource = ({ controller, router, middlewares }: IRouteResource) => {
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

const getIdParam = (req: IRequest) => {
  const { id } = req.params
  return id
}

export { routeResource, handleMiddlewares }