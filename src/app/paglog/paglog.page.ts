
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-paglog',
  templateUrl: './paglog.page.html',
  styleUrls: ['./paglog.page.scss'],
})
export class PaglogPage {

  userEmail: String = "";
  userUID: String = "";
  isLogged: boolean;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  ionViewDidEnter() {
    this.isLogged = false;
    this.afAuth.user.subscribe(user => {
      if(user){
        this.userEmail = user.email;
        this.userUID = user.uid;
        this.isLogged = true;
      }
    })
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.userEmail = "";
      this.userUID = "";
      this.isLogged = false;
      console.log(this.userEmail);
    }, err => console.log(err));
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


}





