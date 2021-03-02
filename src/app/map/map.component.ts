import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { control, MarkerClusterGroupOptions } from 'leaflet';
import { MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import { Map, ZoomAnimEvent, MapOptions, tileLayer, latLng, Marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  openStreetMapLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1,
    maxZoom: 19,
    detectRetina: true,
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  gMapLayer = tileLayer('https://mts1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1,
    maxZoom: 19,
    detectRetina: true,
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  baseMaps = {
    "OpenStreet Map": this.openStreetMapLayer,
    "Google Maps": this.gMapLayer,
  };

  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions = {
    layers: [this.openStreetMapLayer, this.gMapLayer],
    zoom: 1,
    center: latLng(0, 0),
    //this line very important because when it's enabled then the markers will be drawn on canvas and this is good for performance
    preferCanvas: true,
  };

  public map: Map;
  public zoom: number;

  // Marker cluster stuff
  markerClusterGroup: MarkerClusterGroup;
  @Input() markerClusterData: Marker[] = [];
  markerClusterOptions: MarkerClusterGroupOptions;

  markerClusterReady(group: MarkerClusterGroup) {
    this.markerClusterGroup = group;
    console.log('group is ready');
  }
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    control.layers(this.baseMaps).addTo(map);
    this.map = map.setView([34.033759, -5.009296], 6);
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  // switchMapsProvider() {
  //   if (this.gmapsProvider) {
  //     this.tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  //   } else {
  //     this.tileLayer = 'https://mts1.google.com/vt/lyrs=h@186112443&hl=x-local&src=app&x=1325&y=3143&z=13&s=Galile'
  //   }
  //   this.gmapsProvider = !this.gmapsProvider;
  //   this.map.remove();
  //   this.map.
  // }
}
