import {Request, Response} from 'express';
import {Car} from '../domain/Car';
import {CarPoolingService} from '../services/CarPoolingService';

const httpStatusCodes = require('http-status-codes');

/**
 * Endpoint POST /locate
 * @param {Request} request
 * @param {Response} response
 * @param {CarPoolingService} service
 */
export function locateGroup(request: Request, response: Response, service: CarPoolingService): void {

  const body = request.body;
  console.info(`[/locate] It proceeds to locate the group. Group: ${JSON.stringify(body)}`);

  if (invalidParams(body, request.headers)) {

    response.status(httpStatusCodes.BAD_REQUEST);
    response.send({error: 'The request body or headers are incorrect.'});
    return;

  }

  const groupId = body.ID;

  try {

    const carFound: Car|undefined = service.searchCarOnJourneyFrom(groupId);

    if (carFound != null) {

      console.info(`[/locate] The group ID: ${groupId} a journey with car ID ${carFound.id}.`);
      response.status(httpStatusCodes.OK);
      response.send({id: carFound.id, seats: carFound.seats});

    }
    // eslint-disable-next-line max-len
    console.info(`[/locate] It proceeds to locate the group in the waiting list because does not have a journey. Group ID: ${groupId}`);
    const groupInWaitingList = service.existGroupOnTheWaitingList(groupId);
    if (groupInWaitingList === false) {

      console.info(`[/locate] The group ID: ${groupId} was not found in the service.`);
      response.status(httpStatusCodes.NOT_FOUND);

    } else {

      console.info(`[/locate] The group ID: ${groupId} is waiting to be assigned to a car.`);
      response.status(httpStatusCodes.NO_CONTENT);

    }
    response.send();


  } catch (error: any) {

    console.error(`[/locate] Error trying to create a journey in the service. Complete error: ${error?.message}`);
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
