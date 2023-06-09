import {Entity, model, property} from '@loopback/repository';
import {TaskAssignedItem} from './task-assigned-item.model';

@model({settings: {strict: false}})
export class ProjectTask extends Entity {
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
  description: string;

  @property({
    type: 'string',
    default: 'Waiting',
  })
  status?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    default: null,
  })
  updatedAt?: string;

  @property({
    type: 'date',
    default: null,
  })
  finishedAt?: string;

  @property({
    type: 'date',
    default: null,
  })
  expiredAt?: string;

  @property({
    type: 'date',
    default: null,
  })
  taskStartDate?: string;

  @property({
    type: 'date',
    default: null,
  })
  startedAt?: string;

  @property.array(TaskAssignedItem)
  assignedTo?: TaskAssignedItem[];

  @property({
    type: 'string',
  })
  project?: string;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProjectTask>) {
    super(data);
  }
}

export interface ProjectTaskRelations {
  // describe navigational properties here
}

export type ProjectTaskWithRelations = ProjectTask & ProjectTaskRelations;
