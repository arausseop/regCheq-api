import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Meeting} from '../models';
import {MeetingRepository} from '../repositories';

export class MeetingController {
  constructor(
    @repository(MeetingRepository)
    public meetingRepository : MeetingRepository,
  ) {}

  @post('/meetings')
  @response(200, {
    description: 'Meeting model instance',
    content: {'application/json': {schema: getModelSchemaRef(Meeting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {
            title: 'NewMeeting',
            exclude: ['id'],
          }),
        },
      },
    })
    meeting: Omit<Meeting, 'id'>,
  ): Promise<Meeting> {
    return this.meetingRepository.create(meeting);
  }

  @get('/meetings/count')
  @response(200, {
    description: 'Meeting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Meeting) where?: Where<Meeting>,
  ): Promise<Count> {
    return this.meetingRepository.count(where);
  }

  @get('/meetings')
  @response(200, {
    description: 'Array of Meeting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Meeting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Meeting) filter?: Filter<Meeting>,
  ): Promise<Meeting[]> {
    return this.meetingRepository.find(filter);
  }

  @patch('/meetings')
  @response(200, {
    description: 'Meeting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {partial: true}),
        },
      },
    })
    meeting: Meeting,
    @param.where(Meeting) where?: Where<Meeting>,
  ): Promise<Count> {
    return this.meetingRepository.updateAll(meeting, where);
  }

  @get('/meetings/{id}')
  @response(200, {
    description: 'Meeting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Meeting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Meeting, {exclude: 'where'}) filter?: FilterExcludingWhere<Meeting>
  ): Promise<Meeting> {
    return this.meetingRepository.findById(id, filter);
  }

  @patch('/meetings/{id}')
  @response(204, {
    description: 'Meeting PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {partial: true}),
        },
      },
    })
    meeting: Meeting,
  ): Promise<void> {
    await this.meetingRepository.updateById(id, meeting);
  }

  @put('/meetings/{id}')
  @response(204, {
    description: 'Meeting PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() meeting: Meeting,
  ): Promise<void> {
    await this.meetingRepository.replaceById(id, meeting);
  }

  @del('/meetings/{id}')
  @response(204, {
    description: 'Meeting DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.meetingRepository.deleteById(id);
  }
}
