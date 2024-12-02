import { Activity } from "../activity/activity.model";
export class Checkpoint {
    checkpointId: string;
    location: string;
    activities:  Activity[];
  
    constructor(checkpointId: string, location: string, activities: Activity[]) {
      this.checkpointId = checkpointId;
      this.location = location;
      this.activities = activities;
    }
  }
  