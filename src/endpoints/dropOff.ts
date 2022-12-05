import {Request, Response} from 'express';
import {CarPoolingService} from '../services/CarPoolingService';

const httpStatusCodes = require('http-status-codes');

/**
 * Endpoint POST /dropoff
 * @param {Request} request
 * @param {Response} response
 * @param {CarPoolingService} service
 */
export function dropOff(request: Request, response: Response, service: CarPoolingService): void {

  const body = request.body;
  console.info(`[/drooff] It proceeds to drop off the Group: ${JSON.stringify(body)}`);

  if (invalidParams(body, request.headers)) {

    response.status(httpStatusCodes.BAD_REQUEST);
    response.send({error: 'The request body or headers are incorrect.'});
    return;

  }

  const groupId = body.ID;

  try {

    const journey = service.deleteJourneyFromGroupId(groupId);

    if (journey != null) {

      service.vacateCarSeatsFrom(journey.idCar, journey.amountOfPassengers);
      // eslint-disable-next-line max-len
      console.info(`[/dropoff] The journey with group ID ${journey.idGroup} and car ID ${journey.idCar} was deleted successfully.`);
      // TODO cuando se deja un auto, verificar si hay algun grupo esperando que matchee con ese auto
      response.status(httpStatusCodes.OK);

    } else {

      console.info(`[/drooff] The journey with the Group ID: ${JSON.stringify(groupId)} does not exist.`);
      response.status(httpStatusCodes.NOT_FOUND);

    }
    response.send();

  } catch (error: any) {

    console.error(`[/dropoff] Error trying to dropp off a group in the service. Complete error: ${error?.message}`);
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

  return (body == null || body.ID == null || headers['content-type'] !== 'application/x-www-form-urlencoded');

}
