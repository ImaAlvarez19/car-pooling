import {Request, Response} from 'express';
import {CarPoolingService} from '../services/CarPoolingService';
import {PassengersGroup} from '../domain/PassengersGroup';

const httpStatusCodes = require('http-status-codes');

/**
 * Endpoint POST /journey
 * @param {Request} request
 * @param {Response} response
 * @param {CarPoolingService} service
 */
export function createJourney(request: Request, response: Response, service: CarPoolingService): void {

  const body = request.body;
  console.info(`[/journey] It proceeds to create a journey. Body: ${JSON.stringify(body)}`);

  if (invalidParams(body, request.headers)) {

    response.status(httpStatusCodes.BAD_REQUEST);
    response.send({error: 'The request body or headers are incorrect.'});
    return;

  }

  try {

    const group = PassengersGroup.createFrom(body.id, body.people);
    service.assignCarToPassengerGroup(group);
    response.status(httpStatusCodes.OK);
    response.send();

  } catch (error: any) {

    console.error(`[/journey] Error trying to create a journey in the service. Complete error: ${error?.message}`);
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

  return (body == null || body.id == null || body.people == null || headers['content-type'] !== 'application/json');

}
