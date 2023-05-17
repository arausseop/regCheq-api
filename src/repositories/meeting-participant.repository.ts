import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {MeetingParticipant, MeetingParticipantRelations} from '../models';

export class MeetingParticipantRepository extends DefaultCrudRepository<
  MeetingParticipant,
  typeof MeetingParticipant.prototype.id,
  MeetingParticipantRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(MeetingParticipant, dataSource);
  }
}
