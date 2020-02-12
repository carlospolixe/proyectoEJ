import {Component} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
// The above import statement is added
import { Map, tileLayer, marker } from "leaflet";
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
   private router: Router) {}
ionViewDidEnter() {
    this.loadMap();
  }
loadMap() {
    this.map = new Map("mapId").setView([36.6833,-5.45], 13);
    this.newMarker = marker([36.6833,-5.45], {draggable: 
    true}).addTo(this.map);
    this.newMarker.bindPopup("Estamos aqui!").openPopup();

tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
  }
// locatePosition() {
//     this.map.locate({ setView: true }).on("locationfound", (e: any) => {
//       this.newMarker = marker([e.latitude, e.longitude], {
//         draggable: true
//       }).addTo(this.map);
//       this.newMarker.bindPopup("You are located here!").openPopup();
//       this.getAddress(e.latitude, e.longitude); // This line is added
   
//       this.newMarker.on("dragend", () => {
//         const position = this.newMarker.getLatLng();
//         this.getAddress(position.lat, position.lng);// This line is added
       
//       });
//     });
//   }
  
  //The function below is added
  getAddress(lat: number, long: number) {
    // let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    // };
    // this.geocoder.reverseGeocode(lat, long, options).then(results => {
    //   // this.address = Object.values(results[0]).reverse();
      
    // });
  }
// The function below is added
  // confirmPickupLocation() {
  //   let navigationextras: NavigationExtras = {
  //     state: {
  //       pickupLocation: this.address
  //     }
  //   };
  //   this.router.navigate(["home"], navigationextras);
  // }
goBack() {
    this.router.navigate(["home"]);
  }

  bothome(){
    this.router.navigate(["/home"]);
  }
}













// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-pickup-location',
//   templateUrl: './pickup-location.page.html',
//   styleUrls: ['./pickup-location.page.scss'],
// })
// export class PickupLocationPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
