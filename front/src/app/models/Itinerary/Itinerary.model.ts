import { Checkpoint } from "../checkpoint/checkpoint.model";
  
export  class Itinerary {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    ownerName : string = "";
    imageUrl : string = "";
    membersIds: number[];
    budget: number;

  
    constructor(id: number, name: string, description: string,budget : number,ownerId : number , membersIds : number[]) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.ownerId = ownerId;
      this.membersIds = membersIds;
      this.budget = budget
    }
  }
  