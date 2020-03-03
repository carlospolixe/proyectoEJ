import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Juego } from '../juego';
import { Router } from "@angular/router";

import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  arrayColeccionJuegos: any = [{
    id: "",
    data: {} as Juego
   }];
 

  JuegosBD: Juego; 
  idJuegoReg: string;

  // variables para el registro de usuarios
  userEmail: String = "";
  userUID: String = "";
  isLogged: boolean;



  selecJuego(juegoSelec) {
    console.log("Juego seleccionada: ");
    console.log(juegoSelec);
    this.idJuegoReg = juegoSelec.id;
    this.router.navigate(["/detalle/"+this.idJuegoReg]);
  }

  

  clicBotonBorrar() {
    this.firestoreService.borrar("juegos", this.idJuegoReg).then(() => {
      // Actualizar la lista completa
      this.obtenerListaJuegos();
      // Limpiar datos de pantalla
      this.JuegosBD = {} as Juego;
    })
  } 

  boconfig(){
    this.router.navigate(["/config"]);
  }

  bothome(){
    this.router.navigate(["/home"]);
  }

  boMaps(){
    this.router.navigate(["/maps"]);
  }

  boLog(){
    this.router.navigate(["/paglog"]);
  }

  navigateTodetalle() {
    this.router.navigate(["/detalle/"+this.idJuegoReg]);
  }


  clicBotonInsertar() {
    this.router.navigate(["/detalle/Nuevo"]);
  }

  onpickupClick(){
    this.router.navigate(['pickup-location']);
  }



  clicBotonModificar() {
    this.firestoreService.actualizar("juegos", this.idJuegoReg, this.JuegosBD).then(() => {
      // Actualizar la lista completa
      this.obtenerListaJuegos();
      // Limpiar datos de pantalla
      this.JuegosBD = {} as Juego;
    })
  }

  constructor(
    private firestoreService: FirestoreService, 
    private router: Router,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    public afAuth: AngularFireAuth) {

    this.JuegosBD = {} as Juego;
    this.obtenerListaJuegos();
  } 

  

  



  obtenerListaJuegos(){
    this.firestoreService.consultar("juegos").subscribe((resultadoConsultaJuegos) => {
      this.arrayColeccionJuegos = [];
      resultadoConsultaJuegos.forEach((datosjuego: any) => {
        this.arrayColeccionJuegos.push({
          id: datosjuego.payload.doc.id,
          data: datosjuego.payload.doc.data()
        });
      })
    });
  }

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



}
