import {Entity, model, property} from '@loopback/repository';

@model()
export class MeetingParticipant extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    default: 'Sended',
  })
  invitationStatus?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  attendance?: boolean;

  @property({
    type: 'date',
  })
  attendanceAt?: string;

  @property({
    type: 'string',
    required: true,
  })
  participantType: string;

  @property({
    type: 'string',
  })
  user?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'string',
  })
  meeting?: string;

  constructor(data?: Partial<MeetingParticipant>) {
    super(data);
  }
}

export interface MeetingParticipantRelations {
  // describe navigational properties here
}

export type MeetingParticipantWithRelations = MeetingParticipant & MeetingParticipantRelations;
