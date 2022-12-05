import {Car} from '../domain/Car';
import {JourneyDocument} from '../utils/DocumentTypes';
import {Journey} from '../domain/Journey';

export class JourneyService {

  public journeys: JourneyDocument[];

  /**
   * @constructor
   * @param {JourneyDocument[]} journeys
   */
  constructor(journeys: JourneyDocument[] = []) {

    this.journeys = journeys;

  }
  /**
   * Remove all journeys
   */
  public removeAllJourneys(): void {

    this.journeys = [];

  }

  /**
   * Search a car on journey from a passengers group ID
   * @param {number} groupId
   * @return {Car | undefined}
   */
  public searchCarOnJourneyFrom(groupId: number): Car | undefined {

    const journeyFound = this.searchJourneyFromGroupId(groupId);
    if (journeyFound != null) return Car.createFrom(journeyFound.idCar, journeyFound?.amountOfPassengers);

    return;

  }

  /**
   * Delete a journey from group ID
   * @param {number} groupId
   * @return {JourneyDocument | undefined}
  */
  public deleteJourneyFromGroupId(groupId: number): JourneyDocument | undefined {

    const indexToDelete = this.journeys.findIndex((journey: JourneyDocument) =>
      journey.idGroup == groupId && journey.deletedAt == null);
    if (indexToDelete > -1) {

      this.journeys[indexToDelete].deletedAt = new Date();

      return this.journeys[indexToDelete];

    }

    return;

  }

  /**
   * Get a car by ID
   * @param {number} idJourney
   * @return {JourneyDocument}
   */
  public getJourneyByIndex(idJourney: number): JourneyDocument {

    return this.journeys[idJourney];

  }

  /**
   * Get the number of journeys
   * @return {number}
   */
  public numberOfJourneys(): number {

    return this.journeys.length;

  }


  /**
   * Add a journey to the service
   * @param {Journey} aJourney
   */
  public addJourney(aJourney: Journey): void {

    console.info(`[addJourney] It proceed to add the journey ${JSON.stringify(aJourney)}.`);
    this.journeys.push(aJourney);

  }

  /**
   * Search a journey from group ID
   * @param {number} groupId
   * @return {JourneyDocument | undefined}
   */
  private searchJourneyFromGroupId(groupId: number): JourneyDocument | undefined {

    return this.journeys.find((journey: JourneyDocument) => journey.idGroup == groupId);

  }

}
