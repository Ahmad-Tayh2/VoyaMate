import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.css']
})
export class TravelCardComponent {
  @Input() imageUrl!: string;
  @Input() category!: string;
  @Input() author!: string;
  @Input() title!: string;
  @Input() description!: string;
}
