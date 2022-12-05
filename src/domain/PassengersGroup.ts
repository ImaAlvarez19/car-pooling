export class PassengersGroup {

  public amountOfPassengers: number;
  public id: number;

  /**
  * @constructor
  * @param {number} id
  * @param {number} amountOfPassengers
 */
  constructor(id: number, amountOfPassengers: number) {

    this.id = id;
    this.amountOfPassengers = amountOfPassengers;

  }

  /**
   * Create a PassengersGroup form params
   * @param {number} id
   * @param {number} amountOfPassengers
   * @return {PassengersGroup}
   */
  public static createFrom(id: number, amountOfPassengers: number): PassengersGroup {

    if (id == null || amountOfPassengers == null || amountOfPassengers < 1 || amountOfPassengers > 6) {

      // eslint-disable-next-line max-len
      throw new Error(`[PassengersGroup] Error to create a PassengersGroup. Incorrect params: amountOfPassengers ${amountOfPassengers}. ID ${id}.`);

    }

    return new PassengersGroup(id, amountOfPassengers);

  }
}
