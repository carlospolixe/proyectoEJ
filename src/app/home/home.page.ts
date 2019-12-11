import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Juego } from '../juego';
import { Router } from "@angular/router";


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

  // selecJuego(juegoSelec) {
  //   console.log("Juego seleccionada: ");
  //   console.log(juegoSelec);
  //   this.idJuegoReg = juegoSelec.id;
  //   this.JuegosBD.nombre = juegoSelec.data.nombre;
  //   this.JuegosBD.descripcion = juegoSelec.data.descripcion;
  // }

  selecJuego(juegoSelec) {
    console.log("Juego seleccionada: ");
    console.log(juegoSelec);
    this.idJuegoReg = juegoSelec.id;
    this.JuegosBD.nombre = juegoSelec.data.nombre;
    this.JuegosBD.descripcion = juegoSelec.data.descripcion;
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


  clicBotonModificar() {
    this.firestoreService.actualizar("juegos", this.idJuegoReg, this.JuegosBD).then(() => {
      // Actualizar la lista completa
      this.obtenerListaJuegos();
      // Limpiar datos de pantalla
      this.JuegosBD = {} as Juego;
    })
  }

  constructor(private firestoreService: FirestoreService, private router: Router) {

    this.JuegosBD = {} as Juego;
    this.obtenerListaJuegos();
  } 

  navigateTodetalle() {
    this.router.navigate(["/detalle/"+this.idJuegoReg]);
  }


  
  clicBotonInsertar() {
    this.router.navigate(["/detalle/Nuevo"]);
  }


  
  // clicBotonInsertar() {
  //   // this.firestoreService.insertar("juegos", this.JuegosBD).then(() => {
  //   //   console.log('Juego creado correctamente!');
  //   //   this.JuegosBD= {} as Juego;
  //   // }, (error) => {
  //   //   console.error(error);
  //   // });
  // }


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

  

 
  


  


}
