import { WorkLayer } from "./work-layer";

export class WorkSet {
  id: Number;
  workLayerId: Number;
  workLayer: WorkLayer;
  day: Number;
  startTime: String;
  endTime: String;
  startPicker = { hour: 10, minute: 0 };
  endPicker = { hour: 18, minute: 0 };
}
