import {Entity, model, property, hasMany} from '@loopback/repository';
import {Project} from './project.model';

@model({settings: {strict: false}})
export class Customer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  contactPerson: string;

  @property({
    type: 'string',
    required: true,
  })
  contactEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  contactPhone: string;

  @property({
    type: 'date',
    required: true,
  })
  creatdAt: string;

  @property({
    type: 'date',
    default: null,
  })
  updatedAt?: string;

  @hasMany(() => Project, {keyTo: 'customer'})
  projects: Project[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
