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
  Meeting,
  MeetingParticipant,
} from '../models';
import {MeetingRepository} from '../repositories';

export class MeetingMeetingParticipantController {
  constructor(
    @repository(MeetingRepository) protected meetingRepository: MeetingRepository,
  ) { }

  @get('/meetings/{id}/meeting-participants', {
    responses: {
      '200': {
        description: 'Array of Meeting has many MeetingParticipant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MeetingParticipant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MeetingParticipant>,
  ): Promise<MeetingParticipant[]> {
    return this.meetingRepository.meetingParticipants(id).find(filter);
  }

  @post('/meetings/{id}/meeting-participants', {
    responses: {
      '200': {
        description: 'Meeting model instance',
        content: {'application/json': {schema: getModelSchemaRef(MeetingParticipant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Meeting.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingParticipant, {
            title: 'NewMeetingParticipantInMeeting',
            exclude: ['id'],
            optional: ['meeting']
          }),
        },
      },
    }) meetingParticipant: Omit<MeetingParticipant, 'id'>,
  ): Promise<MeetingParticipant> {
    return this.meetingRepository.meetingParticipants(id).create(meetingParticipant);
  }

  @patch('/meetings/{id}/meeting-participants', {
    responses: {
      '200': {
        description: 'Meeting.MeetingParticipant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingParticipant, {partial: true}),
        },
      },
    })
    meetingParticipant: Partial<MeetingParticipant>,
    @param.query.object('where', getWhereSchemaFor(MeetingParticipant)) where?: Where<MeetingParticipant>,
  ): Promise<Count> {
    return this.meetingRepository.meetingParticipants(id).patch(meetingParticipant, where);
  }

  @del('/meetings/{id}/meeting-participants', {
    responses: {
      '200': {
        description: 'Meeting.MeetingParticipant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MeetingParticipant)) where?: Where<MeetingParticipant>,
  ): Promise<Count> {
    return this.meetingRepository.meetingParticipants(id).delete(where);
  }
}
