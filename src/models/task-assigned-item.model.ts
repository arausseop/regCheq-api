import {Model, model, property} from '@loopback/repository';

@model()
export class TaskAssignedItem extends Model {
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
    required: true,
  })
  type: string;


  constructor(data?: Partial<TaskAssignedItem>) {
    super(data);
  }
}

export interface TaskAssignedItemRelations {
  // describe navigational properties here
}

export type TaskAssignedItemWithRelations = TaskAssignedItem & TaskAssignedItemRelations;
