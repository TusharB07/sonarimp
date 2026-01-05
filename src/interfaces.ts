import { IUser } from "./auth/model/userModel";


export interface IResponseDto {
    status: string,
    message?: string,
    results?: number,
    data?: {};
    stack?: string,
    error?: any,
    otpVerified?: Boolean,
}

export interface ITokenResponseDto extends IResponseDto {
    token: string;
    expires: number;
}


/** Used for the async storage. */
export interface IAsyncStoreCtxt {
    tenantId: string;
    currentUser: IUser;
}
