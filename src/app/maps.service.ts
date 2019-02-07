import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { apiKey} from './config';
import { Observable } from 'rxjs';

interface Location{
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})

export class MapsService {

  constructor(private http: HttpClient) { }

  createAuthHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'Access-Control-Allow-Origin');
    // headers.append('Authorization', 'Basic ' + btoa('user-name:password')); 
  }

  getLocation():Observable<any> {
    return this.http.get<Location>(' https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=bhagini+icon&inputtype=textquery&fields=geometry,photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key='+apiKey)
   
  }

  getNearbyRestaurants(lat:any, long:any):Observable<any>{
    let headers = new HttpHeaders();
    this.createAuthHeader(headers);
    return this.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=2500&type=restaurant&key=${apiKey}`, {headers: headers})
  }
}
