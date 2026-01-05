import { Module } from '@nestjs/common';
import { ClientKycMastersService } from './client-kyc-masters.service';
import { ClientKycMastersController } from './client-kyc-masters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsClientkycmasters } from './entities/QmsClientkycmasters';

@Module({
   imports: [
      TypeOrmModule.forFeature([
        QmsClientkycmasters
      ]),
    ],
  controllers: [ClientKycMastersController],
  providers: [ClientKycMastersService]
})
export class ClientKycMastersModule {}
