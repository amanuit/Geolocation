import { Component } from '@angular/core';
import { MapsService } from './maps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  lat: string = '';
  lng: string = '';
  markers = new Array<marker>();
  zoom: number = 14;

  location: Object;

  constructor(private map: MapsService) {}

  ngOnInit() {
  
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.candidates[1].geometry.location.lat;
      this.lng = data.candidates[1].geometry.location.lng;
      this.map.getNearbyRestaurants(this.lat, this.lng).subscribe(res => {
        res.results.forEach(element => {
          let tempMarker={
            lat: null,
            lng: null,
            label: null,
            draggable: null,
          }
          tempMarker.lat = element.geometry.location.lat;
          tempMarker.lng = element.geometry.location.lng;
          tempMarker.label = res.results.indexOf(element).toString();
          tempMarker.draggable = false;
          this.markers.push(tempMarker);
        });
      })
      console.log(this.markers)
    })
  }
}

export interface marker{
  lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
