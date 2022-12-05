import { Journey } from "./Journey";

describe('<Journey> class', () => {

  it('Given a valid params, it should return an instance of Journey', () => {
    // Given
    const group = Journey.createFrom(1, 1, 4, new Date());;
    // When // Then
    expect(group).toBeInstanceOf(Journey);
  });

});
