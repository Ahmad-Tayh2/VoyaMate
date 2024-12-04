import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
@Injectable({
  providedIn: 'root',
})
export class IniteraryService {
  constructor() {}
  map: L.Map | undefined;
  customIcon = L.icon({
    iconUrl: '../../../../assets/location.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  private places!: { name: string; lat: number; lon: number }[];

  initMap(): void {
    this.map = L.map('map').setView([36.806389, 10.181667], 11);
    L.tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles © Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      }
    ).addTo(this.map);

    //  icon that is placed on the map , still gonna change it later

    // Add geocoder control
    (L.Control as any)
      .geocoder({
        defaultMarkGeocode: false,
      })
      .on('markgeocode', (e: any) => {
        const lat_long = e.geocode.center;
        const name = e.geocode.name;
        this.places.push({ name, lat: lat_long.lat, lon: lat_long.lng });
        L.marker(lat_long, { icon: this.customIcon })
          .addTo(this.map!)
          .bindPopup(e.geocode.name)
          .openPopup();
        this.map!.fitBounds(e.geocode.bbox);
        this.handlaPath();
      })
      .addTo(this.map);

    // Add path
  }

  handlaPath() {
    console.log('******************');
    for (let i = 0; i < this.places.length; i++) {
      const place = this.places[i];
      console.log(place);
      L.marker([place.lat, place.lon], { icon: this.customIcon })
        .addTo(this.map!)
        .bindPopup(place.name);

      if (i < this.places.length - 1) {
        const nextPlace = this.places[i + 1];
        this.createPath(
          { lat: place.lat, lon: place.lon },
          { lat: nextPlace.lat, lon: nextPlace.lon }
        );
      }
    }
  }

  createPath = (
    start: { lat: number; lon: number },
    destination: { lat: number; lon: number }
  ) => {
    (L as any).Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lon),
        L.latLng(destination.lat, destination.lon),
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 4 }],
      },
      createMarker: () => null,
      fitSelectedRoutes: false,
      autoRoute: true,
      show: false,
    }).addTo(this.map);
  };

  setPlaces(places: { name: string; lat: number; lon: number }[]) {
    this.places = places;
  }
  getPlaces() {
    return this.places;
  }
}
