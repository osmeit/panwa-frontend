import { Role } from './role';

export class User {
    id: number; //
    email: string; //
    username: string; //
    password: string; 
    firstName: string; // 
    lastName: string; //
    active: boolean; //
    role: Role; //
    token?: string; //
    address: string; //
    city: string; //
    phone: string; //
    postcode: string; //

}
