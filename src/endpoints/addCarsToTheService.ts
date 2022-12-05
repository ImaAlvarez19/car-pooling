import {CarPoolingService} from '../services/CarPoolingService';
import {Request, Response} from 'express';

const httpStatusCodes = require('http-status-codes');

/**
 * Endpoint PUT /cars
 * @param {Request} request
 * @param {Response} response
 * @param {CarPoolingService} service
 */
export function addCarsToTheService(request: Request, response: Response, service: CarPoolingService): void {

  const body = request.body;
  console.info(`[/cars] It proceeds to add cars in the service. Body: ${JSON.stringify(body)}`);
  if (invalidParams(body, request.headers)) {

    response.status(httpStatusCodes.BAD_REQUEST);
    response.send({error: 'The request body or headers are incorrect.'});
    return;

  }

  try {

    service.resetApp();
    service.addCars(body);
    response.status(httpStatusCodes.OK);
    response.send();

  } catch (error: any) {

    console.error(`[/cars] Error trying to add cars in the service. Complete error: ${error?.message}`);
    response.status(httpStatusCodes.BAD_REQUEST);
    response.send({error: error.message});

  }

}

/**
 * Checks the required params and headers
 * @param {any} body
 * @param {any} headers
 * @return {boolean}
 */
function invalidParams(body: any, headers: any): boolean {

  return (body == null || headers['content-type'] !== 'application/json');

}
