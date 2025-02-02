import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { MapComponent } from './components/map/map.component';
import { ListComponent } from './components/list/list.component';
import { DestinationItemComponent } from './components/destination-item/destination-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItineraryComponent,
    MapComponent,
    ListComponent,
    DestinationItemComponent,
  ],
  imports: [CommonModule, ItineraryRoutingModule, FormsModule],
})
export class ItineraryModule {}
