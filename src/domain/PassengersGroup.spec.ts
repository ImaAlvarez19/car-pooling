import { PassengersGroup } from "./PassengersGroup";

describe('<PassengersGroup> class', () => {

  it('Given a valid number of seats, it should return an instance of PassengersGroup', () => {
    // Given
    const group =  PassengersGroup.createFrom(111, 5);
    // When // Then
    expect(group).toBeInstanceOf(PassengersGroup);
  });

  it('Given an invalid number of seats, it should return an error', () => {
    // When // Then
    expect(() => { PassengersGroup.createFrom(111, 100) })
      .toThrow("[PassengersGroup] Error to create a PassengersGroup. Incorrect params: amountOfPassengers 100. ID 111.");
  });

})
