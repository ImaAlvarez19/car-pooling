import { Car } from "./Car";

describe('<Car> class', () => {
  it('Given a  number of seats, it should return an instance of Car', () => {
    // Given
    const car = Car.createFrom(1, 5);
    // When // Then
    expect(car).toBeInstanceOf(Car);
  });

  describe('<reseveSeats> method', () => {
    it('Given a car with avaulability, when a valid number of set to reserve, it should return true', () => {
      // Given
      const car = Car.createFrom(1, 5);
      // When 
      const result = car.occupySeats(5);
      // Then
      expect(result).toBe(true);
      expect(car.seats).toBe(0);
    });

    it('Given a car with avaulability, when an invalid number of set to reserve, it should return true', () => {
      // Given
      const car = Car.createFrom(1, 5);
      // When 
      const result = car.occupySeats(10);
      // Then
      expect(result).toBe(false);
      expect(car.seats).toBe(5);
    });

  });
})
