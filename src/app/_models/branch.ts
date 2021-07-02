import { BranchUser } from "./branchUser";
import { User } from "./user";
import { WorkLayer } from "./work-layer";
export class Branch {
  id: number;

  name: string;

  contactUser: User;

  workLayer: WorkLayer;

  addres: string;

  obligations: string;

  users: BranchUser[];
}
