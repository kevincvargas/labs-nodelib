import { Request, Response, NextFunction, MediaType } from "express";

type IRequest = Request
type IResponse = Response
type INextFunction = NextFunction
type IMediaType = MediaType
type IMiddleware = (request: IRequest, response: IResponse, next: INextFunction) => void

interface IHttpConfig {
  port: number  
}

export { IRequest, IResponse, INextFunction, IMediaType, IHttpConfig, IMiddleware }