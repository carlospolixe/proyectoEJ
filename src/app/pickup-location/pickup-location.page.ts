import {Component} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
// The above import statement is added
import { Map, tileLayer, marker } from "leaflet";
import { CallNumber } from '@ionic-native/call-number/ngx';
// import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
// The above import statement is added
@Component({
  selector: "app-pickup-location",
  templateUrl: "./pickup-location.page.html",
  styleUrls: ["./pickup-location.page.scss"]
})
export class PickupLocationPage {
  map: Map;
  newMarker: any;
  address: string[];
constructor(
  // private geocoder: NativeGeocoder,
   private router: Router,
   private callNumber: CallNumber
  ) {}
ionViewDidEnter() {
    this.loadMap();
  }
loadMap() {
  this.map = new Map("mapId").setView([36.6833,-5.45], 4.5);

  this.newMarker = marker([36.686451 ,-6.1360602], {draggable:true}).addTo(this.map);

  this.newMarker = marker([40.3084042 ,-3.6955431], {draggable:true}).addTo(this.map);

  this.newMarker = marker([40.3084042 ,-3.6955431], {draggable:true}).addTo(this.map);

  this.newMarker = marker([41.658923,-0.80551], {draggable:true}).addTo(this.map);
  
  this.newMarker = marker([36.6833,-5.45], {draggable:true}).addTo(this.map);
  this.newMarker.bindPopup("Estamos aqui!").openPopup();

  tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }).addTo(this.map);
}

  numeroTLF(){
    this.callNumber.callNumber("634283723", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  //The function below is added
  getAddress(lat: number, long: number) {

  }

goBack() {
    this.router.navigate(["home"]);
  }

  bothome(){
    this.router.navigate(["/home"]);
  }
}
