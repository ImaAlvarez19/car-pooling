import {Car} from '../domain/Car';
import {PassengersGroup} from '../domain/PassengersGroup';
import {CarDocument} from '../utils/DocumentTypes';

export class CarService {

  public cars: CarDocument;

  /**
   * @constructor
   * @param {CarDocument} cars
   */
  constructor(cars: CarDocument = {}) {

    this.cars = cars;

  }

  /**
   * Add a list of cars to the service
   * @param {any} cars
   */
  public addCars(cars: any[]): void {

    cars.map((car: any) => {

      const newCar = Car.createFrom(car.id, car.seats);
      this.addCar(newCar);

    });

  }

  /**
   * Find some car for a group of passengers
   * @param {PassengersGroup} aGroup
   * @return {Car}
   */
  public findAvailableCarFor(aGroup: PassengersGroup): Car | undefined {

    console.info(`[findAvailableCarFor] It proceed to look for a car for the group: ${JSON.stringify(aGroup)}`);
    const availableCar = Object.values(this.cars as Car[]).find((car: Car) => {

      return car.hasAvailabilityFor(aGroup.amountOfPassengers);

    });

    return availableCar;

  }

  /**
   * Vacate car seats
   * @param {number} idCar
   * @param {number} amountOfPassengers
   */
  public vacateCarSeatsFrom(idCar: number, amountOfPassengers: number): void {

    this.getCarById(idCar).vacateSeats(amountOfPassengers);

  }

  /**
   * Remove all cars
   */
  public removeAllCars(): void {

    this.cars = {};

  }

  /**
   * Occupies the number of seats in the car
   * @param {number} idCar
   * @param {number} amountOfPassengers
   */
  public occupySeats(idCar: number, amountOfPassengers: number): void {

    this.getCarById(idCar).occupySeats(amountOfPassengers);

  }

  /**
   * Get a car by ID
   * @param {number} idCar
   * @return {Car}
   */
  public getCarById(idCar: number): Car {

    return this.cars[idCar];

  }

  /**
   * Return the number of available cars
   * @return {number}
   */
  public numberOfCars(): number {

    return Object.keys(this.cars).length;

  }

  /**
   * Add a car to the list of cars
   * @param {Car} aCar
   */
  private addCar(aCar: Car): void {

    console.info(`[addCar] It proceed to add the car ID ${aCar.id} to the service cars.`);
    this.cars[aCar.id] = aCar;

  }

}
