import { Entity, model, property, hasMany} from '@loopback/repository';
import {ProjectTask} from './project-task.model';

@model({settings: {strict: false}})
export class Project extends Entity {
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

  @hasMany(() => ProjectTask, {keyTo: 'project'})
  projectTasks: ProjectTask[];

  @property({
    type: 'string',
  })
  customer?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
