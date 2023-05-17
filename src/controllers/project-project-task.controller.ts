import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Project,
  ProjectTask,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectTaskController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/project-tasks', {
    responses: {
      '200': {
        description: 'Array of Project has many ProjectTask',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProjectTask)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProjectTask>,
  ): Promise<ProjectTask[]> {
    return this.projectRepository.projectTasks(id).find(filter);
  }

  @post('/projects/{id}/project-tasks', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProjectTask)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectTask, {
            title: 'NewProjectTaskInProject',
            exclude: ['id'],
            optional: ['project']
          }),
        },
      },
    }) projectTask: Omit<ProjectTask, 'id'>,
  ): Promise<ProjectTask> {
    return this.projectRepository.projectTasks(id).create(projectTask);
  }

  @patch('/projects/{id}/project-tasks', {
    responses: {
      '200': {
        description: 'Project.ProjectTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectTask, {partial: true}),
        },
      },
    })
    projectTask: Partial<ProjectTask>,
    @param.query.object('where', getWhereSchemaFor(ProjectTask)) where?: Where<ProjectTask>,
  ): Promise<Count> {
    return this.projectRepository.projectTasks(id).patch(projectTask, where);
  }

  @del('/projects/{id}/project-tasks', {
    responses: {
      '200': {
        description: 'Project.ProjectTask DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProjectTask)) where?: Where<ProjectTask>,
  ): Promise<Count> {
    return this.projectRepository.projectTasks(id).delete(where);
  }
}
