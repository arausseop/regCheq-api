import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Customer, CustomerRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly projects: HasManyRepositoryFactory<Project, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Customer, dataSource);
    this.projects = this.createHasManyRepositoryFactoryFor('projects', projectRepositoryGetter,);
    this.registerInclusionResolver('projects', this.projects.inclusionResolver);
  }
}
