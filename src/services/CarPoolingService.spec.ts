import { PassengersGroup } from "../domain/PassengersGroup";
import { Car } from "../domain/Car";
import { CarPoolingService } from "./CarPoolingService";

describe('<CarPoolingService> service', () => {

  it('It should create a new instance of CarPoolingService', () => {
    // Given
    const service = new CarPoolingService();
    // When // Then
    expect(service).toBeInstanceOf(CarPoolingService);
  });

  describe('<resetApp> method', () => {
    it('When the app is reseted, cars, watinglist and journeys they should be empty', () => {
      // Given
      const groupWithOnePerson = PassengersGroup.createFrom(111, 1);
      const waitingList = { 1: [groupWithOnePerson] };
      const carWithTwoSeats = Car.createFrom(1, 2);
      const service = new CarPoolingService({ 1: carWithTwoSeats }, waitingList);
      // When
      service.resetApp();
      // Then
      expect(service.carService.numberOfCars()).toBe(0);
      expect(service.journeyService.numberOfJourneys()).toBe(0);
      expect(service.waitingListService.waitingList).toStrictEqual({});
    });
  });

  describe('<assignCarToPassengerGroup> method', () => {
    it('Given a group of passengers and an available car with no group waiting, the journey should be created for the new group', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 5);
      const waitingList = {};
      const carWithSixSeats = Car.createFrom(1, 6);
      const service = new CarPoolingService({ 1: carWithSixSeats }, waitingList);
      // When
      service.assignCarToPassengerGroup(aNewGroupWithFivePersons);
      // Given
      expect(service.journeyService.getJourneyByIndex(0)['idCar']).toBe(carWithSixSeats.id);
      expect(service.journeyService.getJourneyByIndex(0)['idGroup']).toBe(aNewGroupWithFivePersons.id);
      expect(service.carService.getCarById(carWithSixSeats.id).seats).toBe(1);
    });

    it('Given a group of passengers and no car available, it should puts the group on the waiting list', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 5);
      const carWithTwoSeats = Car.createFrom(1, 2);
      const service = new CarPoolingService({ 1: carWithTwoSeats }, {});
      // When
      service.assignCarToPassengerGroup(aNewGroupWithFivePersons);
      // Given
      expect(service.journeyService.numberOfJourneys()).toBe(0);
      expect(service.waitingListService.getGroupsByAmountOfPassengers(aNewGroupWithFivePersons.amountOfPassengers))
        .toStrictEqual([aNewGroupWithFivePersons]);
    });

    it('Given a group of passengers, an available car, and a group on the waiting list with the same number of passengers, it should add the new group to the waiting list and assign the car to the group that was waiting.', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 5);
      const aGroupWaitingWithFivePersons = PassengersGroup.createFrom(222, 5);
      const waitingList = {
        5: [aGroupWaitingWithFivePersons]
      };
      const carWithFiveSeats = Car.createFrom(1, 5);
      const service = new CarPoolingService({ 1: carWithFiveSeats }, waitingList);
      // When
      service.assignCarToPassengerGroup(aNewGroupWithFivePersons);
      // Given
      expect(service.waitingListService.getGroupsByAmountOfPassengers(aNewGroupWithFivePersons.amountOfPassengers))
        .toStrictEqual([aNewGroupWithFivePersons]);
      expect(service.journeyService.getJourneyByIndex(0)['idGroup']).toBe(aGroupWaitingWithFivePersons.id);
    });

    it('Given a car with capacity for two groups, when requested, they should be assigned to the same car', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 2);
      const aNewGroupWithThreePersons = PassengersGroup.createFrom(111, 3);
      const waitingList = {};
      const carWithFiveSeats = Car.createFrom(1, 5);
      const service = new CarPoolingService({ 1: carWithFiveSeats }, waitingList);
      // When
      service.assignCarToPassengerGroup(aNewGroupWithFivePersons);
      service.assignCarToPassengerGroup(aNewGroupWithThreePersons);
      // Then
      const firstJourney = service.journeyService.getJourneyByIndex(0);
      const secondJourney = service.journeyService.getJourneyByIndex(0);
      expect(firstJourney['idCar']).toBe(carWithFiveSeats.id);
      expect(firstJourney['idGroup']).toBe(aNewGroupWithFivePersons.id);
      expect(secondJourney['idGroup']).toBe(aNewGroupWithThreePersons.id);
      expect(secondJourney['idCar']).toBe(carWithFiveSeats.id);
    });
  });

});
