import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-item',
  templateUrl: './destination-item.component.html',
  styleUrls: ['./destination-item.component.css'],
})
export class DestinationItemComponent {
  @Input() place!: { name: string; lat: number; lon: number };
  constructor() {
    console.log(this.place);
  }
}
