import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';
import { HtmlSanitizerMiddleware } from './html-sanitizer.middleware';
import { ClaimModule } from './claim/claim.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PartnerModule } from './masters/partners/partners.module';
import { StatesModule } from './masters/states/states.module';
import { CountryModule } from './masters/countries/country.module';
import { CityModule } from './masters/city/city.module';
import { UsersModule } from './masters/user/users.module';
import { SectorModule } from './masters/sectors/sector.module';
import { RolesModule } from './masters/Roles/roles.module';
import { ProductpartnericconfigModule } from './masters/productpartner-ic-config/productpartnericconfig.module';
import { ProductsModule } from './masters/products/products.module';
import { AddonCoversModule } from './masters/addoncovers/addoncovers.module';
import { ClientKycMastersModule } from './masters/client-kyc-masters/client-kyc-masters.module';
import { TerrorismrateModule } from './terrorismrates/terrorismratemaster.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
      }),
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtpout.secureserver.net', // Use your SMTP provider
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: 'donot-reply@bitinfo.in', // your email address
    //       pass: 'B!tstep$@2024', // your email password
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply"<donot-reply@bitinfo.in>', // default sender
    //   },
    //   template: {
    //     dir: join(__dirname, './template'),
    //     adapter: new HandlebarsAdapter(), // or use PugAdapter, etc.
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    // AccessControlModule.forRoles(roles),
    AuthModule,
    CityModule,
    CountryModule,
    StatesModule,
    UsersModule,
    SectorModule,
    RolesModule,
    PartnerModule,
    ProductpartnericconfigModule,
    ProductsModule,
    RolesModule,
    AddonCoversModule,
    ClientKycMastersModule,
    TerrorismrateModule
    // UserModule,
    // //ClaimIntimationModule,
    // ClaimModule,
    // PolicyModule
    // FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports:[winstonProvider]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HtmlSanitizerMiddleware).forRoutes('*');
  }
}
