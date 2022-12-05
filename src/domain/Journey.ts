export class Journey {

  public idCar: number;
  public idGroup: number;
  public startDate: Date;
  public amountOfPassengers: number;
  public endDate?: Date;
  public deletedAt?: Date;

  /**
  * @constructor
  * @param {number} idCar
  * @param {number} idGroup
  * @param {number} amountOfPassengers
  * @param {Date} startDate
 */
  constructor(idCar: number, idGroup: number, amountOfPassengers: number, startDate: Date = new Date()) {

    this.idCar = idCar;
    this.idGroup = idGroup;
    this.amountOfPassengers = amountOfPassengers;
    this.startDate = startDate;

  }

  /**
   * Create a journey from params
   * @param {number} idCar
   * @param {number} idGroup
   * @param {number} amountOfPassengers
   * @param {Date} startDate
   * @return {Journey}
   */
  public static createFrom(idCar: number, idGroup: number, amountOfPassengers: number, startDate: Date): Journey {

    if (idCar == null || idGroup == null || amountOfPassengers == null) {

      // eslint-disable-next-line max-len
      throw new Error(`[Journey] Error to create a Journey. Incorrect params: amountOfPassengers ${amountOfPassengers}. idCar ${idCar}. idGroup ${idGroup}.`);

    }
    return new Journey(idCar, idGroup, amountOfPassengers, startDate);

  }

}
