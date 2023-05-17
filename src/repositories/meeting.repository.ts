import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Meeting, MeetingRelations, MeetingParticipant} from '../models';
import {MeetingParticipantRepository} from './meeting-participant.repository';

export class MeetingRepository extends DefaultCrudRepository<
  Meeting,
  typeof Meeting.prototype.id,
  MeetingRelations
> {

  public readonly meetingParticipants: HasManyRepositoryFactory<MeetingParticipant, typeof Meeting.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MeetingParticipantRepository') protected meetingParticipantRepositoryGetter: Getter<MeetingParticipantRepository>,
  ) {
    super(Meeting, dataSource);
    this.meetingParticipants = this.createHasManyRepositoryFactoryFor('meetingParticipants', meetingParticipantRepositoryGetter,);
    this.registerInclusionResolver('meetingParticipants', this.meetingParticipants.inclusionResolver);
  }
}
