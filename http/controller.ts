import { IRequest, IResponse } from "."

interface IController {
  get(request: IRequest, response: IResponse): Promise<any>
  show(id: string, request: IRequest, response: IResponse): Promise<any>
  create(request: IRequest, response: IResponse): Promise<any>
  update(id: string, request: IRequest, response: IResponse): Promise<any>
  destroy(id: string, request: IRequest, response: IResponse): Promise<any>
}

export { IController }