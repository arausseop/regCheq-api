import {Entity, hasMany, model, property} from '@loopback/repository';
import {MeetingAgreementsItem} from './meeting-agreements-item.model';
import {MeetingParticipant} from './meeting-participant.model';

@model({settings: {strict: false}})
export class Meeting extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  topic: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @property({
    type: 'date',
    required: true,
  })
  when: string;

  @property({
    type: 'date',
  })
  startedAt?: string;

  @property({
    type: 'date',
  })
  finishedAt?: string;

  @property({
    type: 'string',
    required: true,
  })
  meetingType: string;

  @property({
    type: 'string',
    default: 'Waiting',
  })
  meetingStatus?: string;

  @property.array(MeetingAgreementsItem)
  agreements?: MeetingAgreementsItem[];

  @hasMany(() => MeetingParticipant, {keyTo: 'meeting'})
  meetingParticipants: MeetingParticipant[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Meeting>) {
    super(data);
  }
}

export interface MeetingRelations {
  // describe navigational properties here
}

export type MeetingWithRelations = Meeting & MeetingRelations;
