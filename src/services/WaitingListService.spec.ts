import { PassengersGroup } from "../domain/PassengersGroup";
import { WaitingListService } from "./WaitingListService";


describe('<WaitingListService> service', () => {

  it('It should create a new instance of WaitingListService', () => {
    // Given
    const service = new WaitingListService();
    // When // Then
    expect(service).toBeInstanceOf(WaitingListService);
  });

  describe('<removeWaitingList> method', () => {
    it('When the waiting list is deleted, it should be empty', () => {
      // Given
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const expecteWaitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      }
      const service = new WaitingListService(expecteWaitingList);
      // When
      service.removeWaitingList();
      // Then
      expect(service.waitingList).toStrictEqual({});
    });
  });

  describe('<addPassengersGroupToWaitingList> method', () => {
    it('Given an empty waiting list, when add groups of passengers, they should be in the list', () => {
      // Given
      const service = new WaitingListService();
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const expecteWaitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      }
      // When
      service.addPassengersGroupToWaitingList(groupWithTwoPersons);
      service.addPassengersGroupToWaitingList(groupWithFivePersons);
      // Then
      expect(service.waitingList).toStrictEqual(expecteWaitingList);
    });
  });

  describe('<findGroupOnTheWaitingList> method', () => {
    it('Given a waiting list with a group with the same amount as the new one, it should return the group of the list', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 5);
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const waitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      };
      const service = new WaitingListService(waitingList);
      // When
      const groupFound = service.findGroupOnTheWaitingList(aNewGroupWithFivePersons);
      // Then
      expect(groupFound).toBe(groupWithFivePersons);
    });

    it('Given a waiting list with no group with the same amount as the new one, it should return undefined', () => {
      // Given
      const aNewGroupWithFivePersons = PassengersGroup.createFrom(111, 5);
      const groupWithOnePerson = PassengersGroup.createFrom(111, 1);
      const groupWithThreePersons = PassengersGroup.createFrom(222, 3);
      const waitingList = {
        1: [groupWithOnePerson],
        3: [groupWithThreePersons]
      };
      const service = new WaitingListService(waitingList);
      // When
      const groupFound = service.findGroupOnTheWaitingList(aNewGroupWithFivePersons);
      // Then
      expect(groupFound).toBeUndefined;
    });
  });

  describe('<existGroupOnTheWaitingList> method', () => {
    it('Given an existing group ID, it should return true', () => {
      // Given
      const aGroupId = 111;
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const waitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      };
      const service = new WaitingListService(waitingList);
      // When
      const groupExist = service.existGroupOnTheWaitingList(aGroupId);
      // Then
      expect(groupExist).toBe(true);
    });

    it('Given a non-existent group ID, it should return true', () => {
      // Given
      const aGroupId = 999999;
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const waitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      };
      const service = new WaitingListService(waitingList);
      // When
      const groupExist = service.existGroupOnTheWaitingList(aGroupId);
      // Then
      expect(groupExist).toBe(false);
    });
  });

  describe('<removePassengersGroupFromWaitingList> method', () => {
    it('Given an existing group, when the method is called, it should remove from the waiting list', () => {
      // Given
      const groupWithTwoPersons = PassengersGroup.createFrom(111, 2);
      const groupWithFivePersons = PassengersGroup.createFrom(222, 5);
      const waitingList = {
        2: [groupWithTwoPersons],
        5: [groupWithFivePersons]
      };
      const waitingListExpected = {
        2: [],
        5: [groupWithFivePersons]
      };
      const service = new WaitingListService(waitingList);
      // When
      service.removePassengersGroupFromWaitingList(groupWithTwoPersons);
      // Then
      expect(service.waitingList).toStrictEqual(waitingListExpected);
    });
  });
});
