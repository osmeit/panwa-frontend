import { Branch } from "./branch";
import { User } from "./User";

export class Layer {
  id: Number;
  year: Number;
  week: Number;
  dayOfWeek: Number;
  startTime: string;
  endTime: string;
  branchId: Number;
  branch: Branch;
  user: User;
  startStock: string;
  endStock: string;
  cashDeskNumber: string;
  updateDate: string;
  updateBy: Number;
}
