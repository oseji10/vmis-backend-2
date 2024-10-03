// patient.dto.ts
export class CreatePatientDto {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    otherNames?: string;
    gender?: string;
    dateOfBirth?: Date;
    maritalStatus?: string;
    diseaseType?: string; 
    hospital?: string; 
    hospitalFileNumber?: string;
    status?: string;
    stateOfOrigin?: string;
    stateOfResidence?: string
  }
  