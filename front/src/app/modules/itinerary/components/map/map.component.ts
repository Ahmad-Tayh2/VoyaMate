import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: L.Map | undefined;

  initerary = inject(IniteraryService);
  ngOnInit() {
    this.initerary.initMap();
  }
}
