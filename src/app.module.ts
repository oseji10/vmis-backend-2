import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient/patient.entity';
import * as dotenv from 'dotenv';
import { PatientModule } from './patient/patient.module';
import { HospitalModule } from './hospital/hospital.module';
import { Hospital } from './hospital/hospital.entity';
import { UserModule } from './users/users.module';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { StateModule } from './state/state.module';
import { StockModule } from './stock/stock.module';
import { RequestModule } from './request/request.module';
import { ProductModule } from './product/product.module';
import { User } from './users/users.entity';
import { State } from './state/state.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthModule } from './auth.module';
import { DiseaseModule } from './disease/disease.module';
import { SaleModule } from './sale/sale.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductPricingModule } from './product_pricing/product_pricing.module';
import { ProductRequestModule } from './product_request/product_request.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { TransactionModule } from './transaction/transaction.module';
import { Disease } from './disease/disease.entity';
dotenv.config(); 

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [Patient, Hospital, User, State, Disease],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: ['src/migrations/*.ts'],  // Use TypeScript migration files
      migrations: [join(__dirname, 'migrations/*.ts')],

      synchronize: true,  // set to 'false' in production
    }),
    UserModule,
    PharmacistModule,
    StateModule,
    StockModule,
    RequestModule,
    ProductModule,
    PatientModule, 
    HospitalModule,
    AuthModule,
    DiseaseModule,
    SaleModule,
    SupplierModule,
    ProductPricingModule,
    ProductRequestModule,
    ManufacturerModule,
    TransactionModule
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AppModule {}
