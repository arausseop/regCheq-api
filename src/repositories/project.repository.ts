import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Project, ProjectRelations, ProjectTask} from '../models';
import {ProjectTaskRepository} from './project-task.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly projectTasks: HasManyRepositoryFactory<ProjectTask, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProjectTaskRepository') protected projectTaskRepositoryGetter: Getter<ProjectTaskRepository>,
  ) {
    super(Project, dataSource);
    this.projectTasks = this.createHasManyRepositoryFactoryFor('projectTasks', projectTaskRepositoryGetter,);
    this.registerInclusionResolver('projectTasks', this.projectTasks.inclusionResolver);
  }
}
