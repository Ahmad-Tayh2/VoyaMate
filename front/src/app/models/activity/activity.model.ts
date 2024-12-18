export class Activity {
    id: string;
    url: string;
    name: string;
    description: string;
  
    constructor(id: string, url: string, name: string, description: string) {
      this.id = id;
      this.url = url;
      this.name = name;
      this.description = description;
    }
  }