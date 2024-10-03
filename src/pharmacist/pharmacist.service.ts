import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pharmacist } from './pharmacist.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { CreatePharmacistDto } from './pharmacist.dto';
import { Hospital } from '../hospital/hospital.entity';
import { User } from '../users/users.entity';

@Injectable()
export class PharmacistService {
  constructor(
    @InjectRepository(Pharmacist)
    private pharmacistRepository: Repository<Pharmacist>,

    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

//   findAll(): Promise<Pharmacist[]> {
//     return this.pharmacistRepository.find();
//   }


findAll(): Promise<Pharmacist[]> {
    return this.pharmacistRepository.find({ relations: ['hospitalId', 'userId'],
      select: {
        hospitalId: {
            id: true,
          hospitalName: true,
          shortName: true
        },
        userId: { 
            id: true,  
            email: true,
            phoneNumber: true,
            status: true
          },
        },
    
     });
  }

  findOne(id: string): Promise<Pharmacist> {
    return this.pharmacistRepository.findOne({ where: { id }, relations: ['hospital'] });
  }

  
  async createPharmacistWithUser(data: CreatePharmacistDto): Promise<Pharmacist> {
    const { email, phoneNumber, status, userId,  hospitalId, ...pharmacistData } = data;
  
    // Check if email or phone number already exists
    // const existingUser = await this.userRepository.findOne({
    //   where: [{ email }, { phoneNumber }],
    // });
  
    // if (existingUser) {
    //   throw new Error('User with the same email or phone number already exists');
    // }
  

  
    // Fetch the related entities
    const hospitalEntity = await this.hospitalRepository.findOne({ where: { id: hospitalId } });
    // const disease = await this.diseaseRepository.findOne({ where: { id: diseaseType } });
    // const StateOfOriginEntity = await this.stateRepository.findOne({ where: { id: stateOfOrigin } });
    // const StateOfResidenceEntity = await this.stateRepository.findOne({ where: { id: stateOfResidence } });
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
  
    // Create the pharmacist
    const pharmacistToSave = this.pharmacistRepository.create({
      ...pharmacistData,
      userId: newUser,
      hospitalId: hospitalEntity,
      //   diseaseType: disease,
    //   stateOfOrigin: StateOfOriginEntity,
    //   stateOfResidence:StateOfResidenceEntity
    });
  
    // Save the pharmacist entity
    const savedPharmacist = await this.pharmacistRepository.save(pharmacistToSave);
  
    return savedPharmacist;
  }
  
  
  
  

  async update(id: string, pharmacist: Pharmacist): Promise<Pharmacist> {
    await this.pharmacistRepository.update(id, pharmacist);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.pharmacistRepository.delete(id);
  }
}
