export class Car {

  public id: number;
  public seats: number;
  public locked: boolean;

  /**
   * @constructor
    * @param {number} id
    * @param {number} seats
    * @param {boolean} locked
   */
  constructor(id: number, seats: number, locked: boolean) {

    this.id = id;
    this.seats = seats;
    this.locked = locked;

  }

  /**
   * Create a PassengersGroup form params
   * @param {number} id
   * @param {number} seats
   * @param {boolean} locked
   * @return {PassengersGroup}
   */
  public static createFrom(id: number, seats: number, locked: boolean = false): Car {

    if (id == null || seats == null) {

      // eslint-disable-next-line max-len
      throw new Error(`[Car] Error to create a Car. Some params are wrong: ID ${id}. Seats ${seats}.`);

    }

    return new Car(id, seats, locked);

  }

  /**
   * Try to reserve the number of seats received as a parameter
   * @param {number} amount
   * @return {boolean}
   */
  public occupySeats(amount: number): boolean {

    if (!this.hasAvailabilityFor(amount)) return false;

    this.seats = this.seats - amount;

    return true;

  }

  /**
   * Try to vacate the number of seats received as a parameter
   * @param {number} amount
   * @return {void}
   */
  public vacateSeats(amount: number): void {

    this.seats = this.seats + amount;

  }

  /**
   * Return true if the car has availability seats for the amount received as param
   * @param {number} amountOfSeats
   * @return {boolean}
   */
  public hasAvailabilityFor(amountOfSeats: number): boolean {

    return this.seats - amountOfSeats >= 0;

  }

}
