import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';

import {
  JWT_COOKIE_EXPIRES_IN_MS,
  SMTP_AUTH_USER,
  SMTP_AUTH_PASS,
  USE_SMTP,
  MAX_PASSWORD_RETRY,
  SENDER_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
} from 'src/config/constants';
import * as speakeasy from 'speakeasy';
import * as nodeMailer from 'nodemailer';
import { correctPassword, decryptData, encryptData } from 'src/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { MstMenus } from './MstMenus';
import { Logger } from '@nestjs/common';
import { User } from 'src/common/decorators';  // Import your User model here
import { AppError } from 'utils/appError';
import { IResponseDto, ITokenResponseDto } from 'src/interfaces';
import { CookieOptions } from 'express';
import { QmsUsers } from 'src/masters/user/entity/QmsUsers';
import { QmsUsersRoles } from 'src/masters/Roles/entity/QmsUsersRoles';
import { QmsPartners } from 'src/masters/partners/entity/QmsPartners';




@Injectable()
export class AuthService {
  private otpSecret = speakeasy.generateSecret({ length: 6 });
  private otpMap: Map<string, string> = new Map(); // Map to store email-otp pairs
  private readonly logger = new Logger(AuthService.name);



  constructor(
    @InjectRepository(MstMenus)
    private readonly menuRepository: Repository<MstMenus>,
    @InjectRepository(QmsUsers)
    private readonly userRepository: Repository<QmsUsers>,
    @InjectRepository(QmsUsersRoles)
    private readonly userRoleRepository: Repository<QmsUsersRoles>,
    @InjectRepository(QmsPartners)
    private readonly partnerRepository: Repository<QmsPartners>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,

  ) { }


  async login(req: any, res: any, next: any) {
    const { email, password, otp, mobile, userType, partnerType, roleName, IS_FETCH_TOKEN_ENABLED } = req.body;

    if (email && password) {
      this.logger.log(`About to login with ${email}`);

      const decryptedPassword = decryptData(password);

      // 1. Check if user exists
      // const user = await User({ skipTenant: true }).findOne({ email: email, active: true }).populate("roleId partnerId").select("+password");

      // const user = await User.findOne({ email: email, active: true }).populate("roleId partnerId").select("+password");

      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect("user.roleId", "user_roles") // ✅ Use "user.role", not "user.roleId"
        .innerJoinAndSelect('user.partnerId', 'mst_partner')  // Join mst_partners table based on partnerId
        .addSelect('user.password')  // Ensuring password field is selected
        .where('user.email = :email', { email })  // Filtering by email
        .andWhere('user.active = :active', { active: true })  // Filtering by active status
        .getOne();




      if (!user) {
        this.logger.error(`Incorrect username or password for ${email}`);
        return next(new AppError('Incorrect username or password', 401));
      }

      // 2. Handle partner status, account lock, and userType checks
      if (!user.partnerId['status']) {
        this.logger.error(`${email}: Partner is inactive`);
        return next(new AppError('Your partner is inactive, please contact Admin.', 401));
      }

      if (user.attemptCount >= 50) {
        this.logger.error(`Account locked for ${email}. Attempt count: ${user.attemptCount}`);
        return next(new AppError('Your account is locked. Please contact Admin.', 401));
      }

      //   // Other user type and partner checks go here...

      if (!user.partnerId?.['brokerModeStatus']) {
        // if (!userType || (!partnerType && !roleName)) {
        //   return next(new AppError(`Please select the User Type and Role of user`, 400));
        // }
        if (userType == "intermediary" && user.partnerId['partnerType'] != partnerType) {
          // if (user.partnerId['partnerType'] != partnerType) { //"broker"
          return next(new AppError(`Incorrect username or password`, 400));
          // }

        } else if (userType == "intermediary" && partnerType == 'broker' && ['broker_admin'].includes(user.roleId['name'])) {
          // if (user.partnerId['partnerType'] == partnerType) { //"self"
          return next(new AppError(`Incorrect username or password`, 400));
          // }
        } else if (userType == "insurance" && user.roleId['name'] != roleName) {
          // if (user.roleId['name'] != roleName) {  //"insurer_rm"
          return next(new AppError(`Incorrect username or password`, 400));
          // }

        } else if (userType == "other" && partnerType == 'admin' && !['insurer_admin', 'broker_admin', 'banca_admin', 'agent_admin'].includes(user.roleId['name'])) {
          // if (user.partnerId['partnerType'] == partnerType) { //"self"
          return next(new AppError(`Incorrect username or password`, 400));
          // }
        }
        // else if (userType == "other" && partnerType == 'super_admin' && user.roleId['name'] != USER_ROLES.ADMIN) {
        //   return next(new AppError(`Incorrect username or password`, 400));
        // }
      }
      if (!user || !(await user.correctPassword(decryptedPassword))) {
        let attemptCount = user ? user.attemptCount : 0;
        if (!user) {
          this.logger.error(`status 401 - Incorrect username or password ${email}`);

          return next(new AppError("Incorrect username or password", 401));
        } else {
          attemptCount++;
          user.attemptCount = attemptCount;
          if (user.attemptCount == 50) {
            user.isLocked = true;
          }
          // await User({ skipTenant: true }).findByIdAndUpdate(user._id, user);

          // await user.save({ validateBeforeSave: false });
          // createLoginHistory(user, req.body, StatusOption.FAILED);
          if (user.attemptCount >= 50) {
            this.logger.error(`status 401 - Your Account Is Locked Please Contact Admin ${email} - user attempcount - ${user.attemptCount}`);

            return next(new AppError("Your Account Is Locked Please Contact Admin", 401));
          }
          this.logger.error(`status 401 - Incorrect email or password ${email}`);

          const respDto: IResponseDto = {
            status: "fail",
            data: {
              entity: {
                remainingAttemptCount: 50 - user.attemptCount,
                message: "Incorrect username or password"
              }
            }
          };
          return res.status(200).json(respDto);

          // return next(new AppError("Incorrect email or password", 401));
        }
      }


      if (user.attemptCount >= 50) {
        this.logger.error(`Account locked for ${email}`);
        return next(new AppError('Your account is locked. Please contact Admin.', 401));
      }
      // role part here
      // if (userType == 'intermediary') {
      //   if ([
      //     USER_ROLES.PLACEMENT_CREATOR_AND_APPROVER,
      //     USER_ROLES.PLACEMENT_CREATOR,
      //     USER_ROLES.PLACEMENT_APPROVER,
      //     USER_ROLES.SALES_CREATOR_AND_APPROVER,
      //     USER_ROLES.SALES_CREATOR,
      //     USER_ROLES.SALES_APPROVER
      //   ].includes(user.roleId["name"])) {
      //     if (!user.partnerId["brokerModeStatus"]) {
      //       this.logger.error(`status 401 - For This Role Broker Module Should Be ON`);

      //       return next(new AppError("For This Role Broker Module Should Be ON", 401));
      //     }
      //   } else {
      //     if (user.partnerId["brokerModeStatus"]) {
      //       this.logger.error(`status 401 - For This Role Broker Module Should Be OFF`);

      //       return next(new AppError("For This Role Broker Module Should Be OFF", 401));
      //     }
      //   }
      // }
      // 3. If everything ok, send token back to the client.
      // user.attemptCount = 0;
      // if (oldLogin.length > 0) {
      //   if (typeof user.lastLogin == 'object') {
      //     user.lastLogin = oldLogin[0].createdAt;
      //   }
      // }
      // Disabling this as we are updating anyways in the createAndSendToken method.
      // const updatedUser = await User({ skipTenant: true }).findByIdAndUpdate(user._id, user);
      if (userType == "intermediary" && !IS_FETCH_TOKEN_ENABLED) {
        const respDto = {
          status: "success",
          data: {
            entity: user
          }
        };
        res.status(200).json(respDto);
      } else {
        this.createAndSendToken(user, 200, res);
      }
    }
  }

   async createAndSendToken (user: any, statusCode: any, res: any) {
    try {
      const start = Date.now();
  
      // const token = signToken(user._id);
      // const { userId, ...rest } = user;
      // const payload = { sub: user.id };
      // const time = Number(this.config.get<number>(JWT_COOKIE_EXPIRES_IN_MS));
      // const expires = new Date(Date.now() + time);
  
      // const expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);
      // const expires = new Date(process.env.JWT_EXPIRES_IN);
      // const expires = new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN, 10));
      // const expiresInMin = parseInt(process.env.JWT_EXPIRES_IN, 10);
      // const expiresInSec = expiresInMin * 60;
      const { id, ...rest } = user;
    const payload = { sub: id };

    const time = Number(this.config.get<number>("JWT_COOKIE_EXPIRES_IN_MS"));
    const expires = new Date(Date.now() + time);

    const token = this.jwtService.sign(payload);
      // const expires = new Date(Date.now() + 60 * 1000);
      // const expires = new Date(Date.now() + 60 * 60 * 1000);
      console.log('====================================');
      console.log(expires, 'expiration time');
      console.log('====================================');
      // const token = this.jwtService.sign(payload)

      // A cookie is a small piece of test that a server can send to the client.
      // once a client receives a cookie, it stores it and then sends it back in all future requests to the server.
      // All of the above is done by a browser client.
      const cookieOptions: CookieOptions = {
        expires: expires,
        // the cookie cannot be accessed or modified by the browser, preventing cross site scripting attack.
        httpOnly: true
      };
      console.log(`cookieOptions`, cookieOptions);
  
      // this option makes sure that cookie is only be sent on an encrypted connection.
      if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
      }
      user.accessToken = token;
  
      // const updatedUser = await User({ skipTenant: true }).findByIdAndUpdate(user._id, user);
  
      // Tracking last jwt using redis
      // const client = redisQueryCache.createClient();
      // await client.connect();
      // client.hSet("UserJwt", user._id, token);
      // client.expire("UserJwt", 20 * 60);
  
      // Tracking last jwt using redis
      // const client = redisQueryCache.createClient();
      // await client.connect();
      // client.hSet("UserJwt", user._id, token);
      // client.expire("UserJwt", 20 * 60);
  
      res.cookie("jwt", token, cookieOptions);
  
      // make sure we are not sending the password back to the UI, this comes when we are
      // sending a JWT token on create of a new user.
      user.password = undefined;
      // user.partnerId['pan'] = undefined;
  
      const respDto: ITokenResponseDto = {
        status: "success",
        token: token,
        expires: expires.getTime(),
        data: {
          entity: user
        }
      };
      const end = Date.now();
      this.logger.log(`createAndSendToken took execution time: ${end - start} ms`);
      res.status(statusCode).json(respDto);
    } catch (error) {
      this.logger.error(`createAndSendToken failed: ${error ? `${error.message}` : ` ${error.stack}`}`);
      console.log(`error`, error);
    }
  };
}
