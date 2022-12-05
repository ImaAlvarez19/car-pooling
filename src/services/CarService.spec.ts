import { PassengersGroup } from "../domain/PassengersGroup";
import { Car } from "../domain/Car";
import { CarService } from "./CarService";

describe('<CarService> service', () => {

  it('It should create a new instance of CarService', () => {
    // Given
    const service = new CarService();
    // When // Then
    expect(service).toBeInstanceOf(CarService);
  });

  describe('<addCars> method', () => {
    it('When cars are added, they should be in the list of available cars', () => {
      // Given
      const service = new CarService();
      const cars = [{ "id": 1, "seats": 4 }, { "id": 2, "seats": 6 }];
      // When
      service.addCars(cars);
      // Then
      expect(service.getCarById(1).id).toBe(1);
      expect(service.getCarById(2).id).toBe(2);
    });
  });

  describe('<removeAllCars> method', () => {
    it('When the cars are deleted, the list of available cars it should be empty', () => {
      // Given
      const carWithTwoSeats = Car.createFrom(1, 2);
      const service = new CarService({ 1: carWithTwoSeats });
      // When
      service.removeAllCars();
      // Then
      expect(service.cars).toStrictEqual({});
    });
  });

  describe('<findAvailableCarFor> method', () => {
    it('Given a valid car for the passenger group, it should return it', () => {
      // Given
      const carWithTwoSeats = Car.createFrom(1, 2);
      const cars = { 2: carWithTwoSeats };
      const service = new CarService(cars);
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      // Then
      expect(service.findAvailableCarFor(groupWithTwoPersons)).toBe(carWithTwoSeats);
    });

    it('Given an invalid car for the passenger group, it should return undefined', () => {
      // Given
      const carWithTwoSeats = Car.createFrom(1, 2);
      const cars = { 2: carWithTwoSeats };
      const service = new CarService(cars);
      const groupWithFivePersons = PassengersGroup.createFrom(111, 5);
      // Then
      expect(service.findAvailableCarFor(groupWithFivePersons)).toBeUndefined;
    });
  });

  describe('<vacateCarSeatsFrom> method', () => {
    it('Given a valid car with three available seats, when vacates two seats, the car its should have five available seats', () => {
      // Given
      const carWithThreeSeats = Car.createFrom(1, 3);
      const cars = { 1: carWithThreeSeats };
      const service = new CarService(cars);
      service.vacateCarSeatsFrom(carWithThreeSeats.id, 2)
      // Then
      expect(service.getCarById(1).seats).toBe(5);
    });
  });

  describe('<occupySeats> method', () => {
    it('Given a valid car with three available seats, when occupies two seats, the car its should have one available seat', () => {
      // Given
      const carWithThreeSeats = Car.createFrom(1, 3);
      const cars = { 1: carWithThreeSeats };
      const service = new CarService(cars);
      service.occupySeats(carWithThreeSeats.id, 2)
      // Then
      expect(service.getCarById(1).seats).toBe(1);
    });
  });

})
