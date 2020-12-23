import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MarkerClusterGroupOptions } from 'leaflet';
import { MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import { Map, ZoomAnimEvent, MapOptions, tileLayer, latLng, Marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 1,
    center: latLng(0, 0)
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
    this.map = map.setView([34.033759, -5.009296], 6);
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
