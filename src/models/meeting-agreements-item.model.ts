import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MeetingAgreementsItem extends Model {

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
  category: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  agreements: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MeetingAgreementsItem>) {
    super(data);
  }
}

export interface MeetingAgreementsItemRelations {
  // describe navigational properties here
}

export type MeetingAgreementsItemWithRelations = MeetingAgreementsItem & MeetingAgreementsItemRelations;
