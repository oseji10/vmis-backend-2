import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { User } from '../users/users.entity';
import { Disease } from '../disease/disease.entity';
import { Hospital } from '../hospital/hospital.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreatePatientDto } from './patient.dto';
import { State } from '../state/state.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,

    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,

    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ relations: ['hospital', 'diseaseType', 'user', 'stateOfResidence', 'stateOfOrigin'],
      select: {
        hospital: {
          hospitalName: true,
          shortName: true
        },
        
          diseaseType: {   
            diseaseName: true,
          },
        
          user: {   
            email: true,
            phoneNumber: true,
            status: true
          },
          stateOfOrigin:{
            stateName: true
          },
          stateOfResidence:{
            stateName: true
          },
          
        },
    
     });
  }

  async findOneByContactInfo(phoneNumber: string, email: string): Promise<Patient | null> {
    return await this.patientRepository.createQueryBuilder('patient')
      .innerJoinAndSelect('patient.user', 'user') // Assuming the relation is named 'user'
      .where('user.phoneNumber = :phoneNumber', { phoneNumber })
      .andWhere('user.email = :email', { email })
      .getOne();
  }
  

  
  async createPatientWithUser(data: CreatePatientDto): Promise<Patient> {
    const { email, phoneNumber, status, stateOfOrigin, stateOfResidence, diseaseType, hospital, ...patientData } = data;
  
    // Check if email or phone number already exists
    // const existingUser = await this.userRepository.findOne({
    //   where: [{ email }, { phoneNumber }],
    // });
  
    // if (existingUser) {
    //   throw new Error('User with the same email or phone number already exists');
    // }
  

  
    // Fetch the related entities
    const disease = await this.diseaseRepository.findOne({ where: { id: diseaseType } });
    const hospitalEntity = await this.hospitalRepository.findOne({ where: { id: hospital } });
    const StateOfOriginEntity = await this.stateRepository.findOne({ where: { id: stateOfOrigin } });
    const StateOfResidenceEntity = await this.stateRepository.findOne({ where: { id: stateOfResidence } });
    // Ensure the related entities exist
    // if (!disease || !hospitalEntity || !StateOfResidenceEntity || !StateOfOriginEntity) {
    //   throw new HttpException('Disease, State of Origin, State of Residence or Hospital not found', HttpStatus.NOT_FOUND);
    // }

    // if (!disease) {
    //   throw new HttpException(`Disease with ID ${diseaseType} not found`, HttpStatus.NOT_FOUND);
    // }
    
    // if (!hospitalEntity) {
    //   throw new HttpException(`Hospital with ID ${hospital} not found`, HttpStatus.NOT_FOUND);
    // }

    // if (!StateOfOriginEntity) {
    //   throw new HttpException(`State of Origin with ID ${stateOfOrigin} not found`, HttpStatus.NOT_FOUND);
    // }
    
    // if (!StateOfResidenceEntity) {
    //   throw new HttpException(`State of Residence with ID ${stateOfResidence} not found`, HttpStatus.NOT_FOUND);
    // }
    


        // Create and save the user
        const newUser = await this.userRepository.save({
          email,
          phoneNumber,
          // password,
          status
        });
  
    // Create the patient
    const patientToSave = this.patientRepository.create({
      ...patientData,
      user: newUser,
      diseaseType: disease,
      hospital: hospitalEntity,
      stateOfOrigin: StateOfOriginEntity,
      stateOfResidence:StateOfResidenceEntity
    });
  
    // Save the patient entity
    const savedPatient = await this.patientRepository.save(patientToSave);
  
    return savedPatient;
  }
  
  
  
  

  // async update(id: string, patient: Patient): Promise<Patient> {
  //   await this.patientRepository.update(id, patient);
  //   return this.findOne(id);
  // }

  async remove(id: string): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
