export class SignUp {
    email: string;
    // tslint:disable-next-line:variable-name
    first_name: string;
    // tslint:disable-next-line:variable-name
    last_name: string;
    // tslint:disable-next-line:variable-name
    password: string;
    // tslint:disable-next-line:variable-name
    confirm_password: string;
    // tslint:disable-next-line:variable-name
    institution?: string;
    // tslint:disable-next-line:variable-name
    device_name?: string;
    // tslint:disable-next-line:variable-name
    terms_of_use?: boolean;

}
export interface Responsemsg {
    response: Response;
    msg: string;
    status: number;
}

export interface Message {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    created?: Date;
    updated?: Date;
    verification_token?: string;
    password?: string;
    token?: string;
}

export class ResetPassword{
    token: string;
    password: string;
    // tslint:disable-next-line:variable-name
    confirm_password: string;
}

export class ForgotPassword{
   email: string;
}
