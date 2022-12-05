import {WaitingListDocument} from '../utils/DocumentTypes';
import {PassengersGroup} from '../domain/PassengersGroup';

export class WaitingListService {

  public waitingList: WaitingListDocument;

  /**
   * @constructor
   * @param {WaitingListDocument} waitingList
   */
  constructor(waitingList: WaitingListDocument = {}) {

    this.waitingList = waitingList;

  }

  /**
   * Add the group of passengers received as params to the waiting list
   * @param {PassengersGroup} aGroup
   */
  public addPassengersGroupToWaitingList(aGroup: PassengersGroup): void {

    const amount =aGroup.amountOfPassengers;

    if (this.waitingList[amount] == null) {

      this.waitingList[amount] = [];

    }

    this.waitingList[amount].push(aGroup);

  }

  /**
   * Find a group with whe same amount of passengers on the waiting list
   * @param {PassengersGroup} aGroup
   * @return {PassengersGroup|undefined}
   */
  public findGroupOnTheWaitingList(aGroup: PassengersGroup): PassengersGroup|undefined {

    const amountOfPassengers = aGroup.amountOfPassengers;
    // eslint-disable-next-line max-len
    if (this.getGroupsByAmountOfPassengers(amountOfPassengers) == null || this.getGroupsByAmountOfPassengers(amountOfPassengers).length == 0) return;

    return this.getGroupsByAmountOfPassengers(amountOfPassengers)[0];

  }


  /**
   * Find a group with on the waiting list and return true if exists
   * @param {number} groupId
   * @return {boolean}
   */
  public existGroupOnTheWaitingList(groupId: number): boolean {

    // eslint-disable-next-line max-len
    console.info(`[existGroupOnTheWaitingList] It proceeds to verify if exists the group ID: ${groupId} in the waiting list.`);
    const groupFound = Object.values(this.waitingList).find((arrayOfGroups: any) => {

      return arrayOfGroups.find((group: PassengersGroup) => group.id == groupId);

    });

    if (groupFound != undefined) {

      console.info(`[existGroupOnTheWaitingList] The group ID: ${groupId} exists in the waiting list.`);
      return true;

    } else {

      console.info(`[existGroupOnTheWaitingList] The group ID: ${groupId} does not exist in the waiting list.`);
      return false;

    }

  }

  /**
   * Remove the waiting list
   */
  public removeWaitingList(): void {

    this.waitingList = {};

  }

  /**
   * Remove the group received as param from the waiting list
   * @param {PassengersGroup} aGroup
  */
  public removePassengersGroupFromWaitingList(aGroup: PassengersGroup): void {

    // eslint-disable-next-line max-len
    console.info(`[removePassengersGroupFromWaitingList] It proceed to remove the group ID ${aGroup.id} from the waiting list.`);
    this.getGroupsByAmountOfPassengers(aGroup.amountOfPassengers).shift();
    //  waitingList[aGroup.amountOfPassengers].shift();

  }

  /**
   * Get an array of PassengersGroup by amountOfPassengers
   * @param {number} amountOfPassengers
   * @return {Car}
   */
  public getGroupsByAmountOfPassengers(amountOfPassengers: number): PassengersGroup[] {

    return this.waitingList[amountOfPassengers];

  }

}
