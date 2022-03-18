import { MissingParamError } from "../errors/missing-param-error"
import { HttpResponse, HttpRequest } from "../protocols/https"

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if(!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    } 
    
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    } 
    
    else { 
      return { 
        statusCode: 200,
        body: "Succes"
      }
    }
  }
}