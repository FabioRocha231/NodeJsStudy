import { MissingParamError } from "../errors/missing-param-error"
import { HttpResponse, HttpRequest } from "../protocols/https"
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
     return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
     return badRequest(new MissingParamError('email'))
    }

    else {
      return {
        statusCode: 200,
        body: "Succes"
      }
    }
  }
}