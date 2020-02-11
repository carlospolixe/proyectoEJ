import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  

  bothome(){
    this.router.navigate(["/home"]);
  }

  boconfig(){
    this.router.navigate(["/config"]);
  }

  boMaps(){
    this.router.navigate(["/maps"]);
  }

  onpickupClick(){
    this.router.navigate(['pickup-location']);
  }
  

}
