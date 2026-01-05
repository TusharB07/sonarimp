import { TypeOrmModule } from "@nestjs/typeorm";
import { ClaimController } from "./claim.controller";
import { ClaimService } from "./claim.service";
import { Module } from "@nestjs/common";
import { DowClaims } from "./entities/claim.entity";
import { MstClaimtype } from "./entities/claimtype.entiy";

import { MstAccidentStates } from "./entities/claimStates.enitiy";
import { MstAccidentCities } from "./entities/claimCities.entity";
import { MstClaimdocumenttype } from "./entities/MstClaimdocumenttype";
import { MstPincode } from "./entities/claimPincode.entity";
import { MailService } from "src/mailService";

// src\claim\entities\claim.entity.ts

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule { }