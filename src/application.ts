import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import fs from 'fs';
import path from 'path';
import {MongoDataSource} from './datasources';
import {TaskAssignedItem} from './models';
import {MeetingAgreementsItem} from './models/meeting-agreements-item.model';
import {CustomerRepository, MeetingParticipantRepository, MeetingRepository, ProjectRepository, ProjectTaskRepository} from './repositories';
import {MySequence} from './sequence';
const ObjectId = require('mongodb').ObjectId
import YAML = require('yaml');

export {ApplicationConfig};

export class RegCheqApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(AuthenticationComponent);

    // Mount jwt component
    this.component(JWTAuthenticationComponent);

    // Bind datasource
    this.dataSource(MongoDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async migrateSchema(options?: SchemaMigrationOptions): Promise<void> {
    await super.migrateSchema(options);

    // Pre-populate users
    const userRepo = await this.getRepository(UserRepository);
    await userRepo.deleteAll();
    const usersDir = path.join(__dirname, '../fixtures/users');
    const usersFiles = fs.readdirSync(usersDir);

    for (const file of usersFiles) {
      if (file.endsWith('.yml')) {
        const userFile = path.join(usersDir, file);
        const yamlString = fs.readFileSync(userFile, 'utf8');
        const user = YAML.parse(yamlString);
        await userRepo.create(user);
      }
    }

    // Pre-populate customers
    const customerRepo = await this.getRepository(CustomerRepository);
    await customerRepo.deleteAll();
    const customersDir = path.join(__dirname, '../fixtures/customers');
    const customersFiles = fs.readdirSync(customersDir);

    for (const file of customersFiles) {
      if (file.endsWith('.yml')) {
        const customerFile = path.join(customersDir, file);
        const yamlString = fs.readFileSync(customerFile, 'utf8');
        const customer = YAML.parse(yamlString);
        await customerRepo.create(customer);
      }
    }

    // Pre-populate projects
    const projectRepo = await this.getRepository(ProjectRepository);
    await projectRepo.deleteAll();
    const projectsDir = path.join(__dirname, '../fixtures/projects');
    const projectsFiles = fs.readdirSync(projectsDir);

    for (const file of projectsFiles) {
      if (file.endsWith('.yml')) {
        const projectFile = path.join(projectsDir, file);
        const yamlString = fs.readFileSync(projectFile, 'utf8');
        const project = YAML.parse(yamlString);
        const customer = await customerRepo.findOne({where: {name: project.customer}});
        project.customer = customer?.id;
        await projectRepo.create(project);
      }
    }

    //TODO Migrate ProjectTasks


    // Pre-populate meetings
    const meetingRepo = await this.getRepository(MeetingRepository);
    await meetingRepo.deleteAll();
    const meetingsDir = path.join(__dirname, '../fixtures/meetings');
    const meetingsFiles = fs.readdirSync(meetingsDir);

    for (const file of meetingsFiles) {
      if (file.endsWith('.yml')) {
        const meetingFile = path.join(meetingsDir, file);
        const yamlString = fs.readFileSync(meetingFile, 'utf8');
        const meeting = YAML.parse(yamlString);
        if (meeting.agreements && meeting.agreements.length > 0) {
          let newAgreementsArray = [];
          for (let meetingAgreement of meeting.agreements) {

            const modelAgreements = await new MeetingAgreementsItem();
            modelAgreements.id = new ObjectId();
            modelAgreements.category = meetingAgreement.category;
            modelAgreements.agreements = meetingAgreement.agreements;

            newAgreementsArray.push(modelAgreements);
          }
          meeting.agreements = newAgreementsArray;
        }

        await meetingRepo.create(meeting);
      }
    }

    // Pre-populate meetingsParticipants
    const meetingParticipantRepo = await this.getRepository(MeetingParticipantRepository);
    await meetingParticipantRepo.deleteAll();
    const meetingParticipantsDir = path.join(__dirname, '../fixtures/meetings/meeting-participants');
    const meetingParticipantsFiles = fs.readdirSync(meetingParticipantsDir);

    for (const file of meetingParticipantsFiles) {
      if (file.endsWith('.yml')) {
        const meetingParticipantFile = path.join(meetingParticipantsDir, file);
        const yamlString = fs.readFileSync(meetingParticipantFile, 'utf8');
        const meetingParticipants = YAML.parse(yamlString);
        if (meetingParticipants.participants && meetingParticipants.participants.length > 0) {

          for (let participant of meetingParticipants.participants) {

            const meeting = await meetingRepo.findOne({where: {topic: participant.meeting}});
            participant.meeting = meeting?.id;
            await meetingParticipantRepo.create(participant);

          }
        }
      }
    }

    // Pre-populate meetingsParticipants
    const projectTaskRepo = await this.getRepository(ProjectTaskRepository);
    await projectTaskRepo.deleteAll();
    const projectTasksDir = path.join(__dirname, '../fixtures/projects/project-task');
    const projectTasksFiles = fs.readdirSync(projectTasksDir);

    for (const file of projectTasksFiles) {
      if (file.endsWith('.yml')) {
        const projectTaskFile = path.join(projectTasksDir, file);
        const yamlString = fs.readFileSync(projectTaskFile, 'utf8');
        const projectTasks = YAML.parse(yamlString);
        if (projectTasks.tasks && projectTasks.tasks.length > 0) {

          for (let task of projectTasks.tasks) {

            const project = await projectRepo.findOne({where: {name: task.project}});
            task.project = project?.id;

            let newAssignedToArray = [];
            for (let assigned of task.assignedTo) {

              const modelAssigned = await new TaskAssignedItem();
              modelAssigned.id = new ObjectId();
              modelAssigned.name = assigned.name;
              modelAssigned.email = assigned.email;
              modelAssigned.type = assigned.type;

              newAssignedToArray.push(modelAssigned);
            }
            task.assignedTo = newAssignedToArray;
            await projectTaskRepo.create(task);

          }
        }
      }
    }
  }
}
