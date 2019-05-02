import { BranchUser } from './branchUser';
import { User } from './user';
export class Branch {
    id: number; 
    
    name: string;

    contactUser: User;

    addres: string;

    obligations: string;

    users: BranchUser[];
}
