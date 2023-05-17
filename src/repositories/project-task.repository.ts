import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ProjectTask, ProjectTaskRelations} from '../models';

export class ProjectTaskRepository extends DefaultCrudRepository<
  ProjectTask,
  typeof ProjectTask.prototype.id,
  ProjectTaskRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(ProjectTask, dataSource);
  }
}
