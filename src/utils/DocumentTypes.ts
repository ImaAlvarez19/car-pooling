import {Car} from '../domain/Car';
import {PassengersGroup} from '../domain/PassengersGroup';
import {Journey} from '../domain/Journey';

export type CarDocument = {
  [key: number]: Car;
};

export type WaitingListDocument = {
  [key: number]: PassengersGroup[];
};

export type JourneyDocument = Journey;
