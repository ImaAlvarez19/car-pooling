import { Journey } from "../domain/Journey";
import { JourneyDocument } from "../utils/DocumentTypes";
import { JourneyService } from "./JourneyService";

describe('<JourneyService> service', () => {

  it('It should create a new instance of JourneyService', () => {
    // Given
    const service = new JourneyService();
    // When // Then
    expect(service).toBeInstanceOf(JourneyService);
  });

  describe('<removeAllJourneys> method', () => {
    it('When the journeys are deleted, the array of journeys it should be empty', () => {
      // Given
      const journeys: JourneyDocument[] = [
        Journey.createFrom(1, 1, 3, new Date())
      ];
      const service = new JourneyService(journeys);
      // When
      service.removeAllJourneys();
      // Then
      expect(service.journeys).toStrictEqual([]);
    });
  });

  describe('<deleteJourneyFromGroupId> method', () => {
    it('Given a service with journeys and a valid group ID, when is deleted, it should set the deletedAt field', () => {
      // Given
      const journeys: JourneyDocument[] = [
        Journey.createFrom(1, 1, 3, new Date())
      ];
      const service = new JourneyService(journeys);
      const journeyDeleted = service.deleteJourneyFromGroupId(1);
      // Then
      expect(service.getJourneyByIndex(0)).toStrictEqual(journeyDeleted);
      expect(service.getJourneyByIndex(0).deletedAt).toBeInstanceOf(Date);
    });


    it('Given a service with journeys and an invalid group ID, when is deleted, it should not set the deletedAt field', () => {
      // Given
      const journeys: JourneyDocument[] = [
        Journey.createFrom(1, 1, 3, new Date())
      ];
      const service = new JourneyService(journeys);
      service.deleteJourneyFromGroupId(1111);
      // Then
      expect(service.getJourneyByIndex(0).deletedAt).toBeUndefined();
    });
  });

  describe('<searchCarOnJourneyFrom> method', () => {
  });
})

