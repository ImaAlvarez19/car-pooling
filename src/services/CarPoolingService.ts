import {Car} from '../domain/Car';
import {CarDocument, JourneyDocument, WaitingListDocument} from '../utils/DocumentTypes';
import {PassengersGroup} from '../domain/PassengersGroup';
import {CarService} from './CarService';
import {WaitingListService} from './WaitingListService';
import {JourneyService} from './JourneyService';
import {Journey} from '../domain/Journey';

export class CarPoolingService {

  public carService: CarService;
  public waitingListService: WaitingListService;
  public journeyService: JourneyService;

  /**
   * @constructor
   * @param {CarDocument} cars
   * @param {WaitingListDocument} waitingList
   * @param {JourneyDocument[]} journeys
   */
  constructor(cars: CarDocument = {}, waitingList: WaitingListDocument = {}, journeys: JourneyDocument[] = []) {

    this.carService = new CarService(cars);
    this.waitingListService = new WaitingListService(waitingList);
    this.journeyService = new JourneyService(journeys);

  }

  /**
   * Add a list of cars to the service
   * @param {any} cars
   */
  public addCars(cars: any[]): void {

    this.carService.addCars(cars);

  }

  /**
   * Try to assign a group to a car
   * @param {PassengersGroup} aGroup
   */
  public assignCarToPassengerGroup(aGroup: PassengersGroup): void {

    const availableCar = this.carService.findAvailableCarFor(aGroup);
    if (availableCar == null) {

      // eslint-disable-next-line max-len
      console.info(`[createJourneyFromPassengerGroup] The group ID ${aGroup.id} is added to the waiting list because there are no cars available.`);
      this.waitingListService.addPassengersGroupToWaitingList(aGroup);
      return;

    }

    const groupWaitingInTheList = this.waitingListService.findGroupOnTheWaitingList(aGroup);
    if (groupWaitingInTheList != null) {

      // eslint-disable-next-line max-len
      console.info(`[createJourneyFromPassengerGroup] The group ID ${aGroup.id} is added to the waiting list because the group ID ${groupWaitingInTheList.id} is waiting in the list.`);
      this.waitingListService.addPassengersGroupToWaitingList(aGroup);
      this.waitingListService.removePassengersGroupFromWaitingList(groupWaitingInTheList);

    }

    this.createJourneyToPassengerGroup(groupWaitingInTheList || aGroup, availableCar);

  }

  /**
   * Vacate car seats
   * @param {number} idCar
   * @param {number} amountOfPassengers
   */
  public vacateCarSeatsFrom(idCar: number, amountOfPassengers: number): void {

    this.carService.vacateCarSeatsFrom(idCar, amountOfPassengers);

  }

  /**
   * Find a group with on the waiting list and return true if exists
   * @param {number} groupId
   * @return {boolean}
   */
  public existGroupOnTheWaitingList(groupId: number): boolean {

    return this.waitingListService.existGroupOnTheWaitingList(groupId);

  }

  /**
   * Reset the app deleting cars, journeys and waiting list
   */
  public resetApp(): void {

    this.carService.removeAllCars();
    this.journeyService.removeAllJourneys();
    this.waitingListService.removeWaitingList();

  }

  /**
   * Search a car on journey from a passengers group ID
   * @param {number} groupId
   * @return {Car | undefined}
   */
  public searchCarOnJourneyFrom(groupId: number): Car | undefined {

    return this.journeyService.searchCarOnJourneyFrom(groupId);

  }

  /**
   * Delete a journey from group ID
   * @param {number} groupId
   * @return {JourneyDocument | undefined}
   */
  public deleteJourneyFromGroupId(groupId: number): JourneyDocument | undefined {

    return this.journeyService.deleteJourneyFromGroupId(groupId);

  }

  /**
   * Create a journey from a group and a car
   * @param {PassengersGroup} aGroup
   * @param {Car} aCar
   */
  private createJourneyToPassengerGroup(aGroup: PassengersGroup, aCar: Car): void {

    console.info(`[createJourneyFromPassengerGroup] The car ID ${aCar.id} is available for the group ID ${aGroup.id}.`);
    const journey = Journey.createFrom(aCar.id, aGroup.id, aGroup.amountOfPassengers, new Date());
    this.journeyService.addJourney(journey);
    this.carService.occupySeats(aCar.id, aGroup.amountOfPassengers);

    // eslint-disable-next-line max-len
    console.info(`[createJourneyFromPassengerGroup] The journey was created successfully with car ID ${aCar.id} and group ID ${aGroup.id}.`);

  }

}
