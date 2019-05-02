import { Branch } from 'src/app/_models/branch';
import { User } from './user';
export class BranchUser {
    userId: Number;
    user: User;
    branchId: Number;
    branch: Branch;
}
