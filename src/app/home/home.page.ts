import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Juego } from '../juego';


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

  selecJuego(juegoSelec) {
    console.log("Juego seleccionada: ");
    console.log(juegoSelec);
    this.idJuegoReg = juegoSelec.id;
    this.JuegosBD.nombre = juegoSelec.data.nombre;
    this.JuegosBD.descripcion = juegoSelec.data.descripcion;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("juegos", this.idJuegoReg).then(() => {
      // Actualizar la lista completa
      this.obtenerListaJuegos();
      // Limpiar datos de pantalla
      this.JuegosBD = {} as Juego;
    })
  } 

  clicBotonModificar() {
    this.firestoreService.actualizar("juegos", this.idJuegoReg, this.JuegosBD).then(() => {
      // Actualizar la lista completa
      this.obtenerListaJuegos();
      // Limpiar datos de pantalla
      this.JuegosBD = {} as Juego;
    })
  }

  constructor(private firestoreService: FirestoreService) {

    this.JuegosBD = {} as Juego;
    this.obtenerListaJuegos();
  } 


  
  clicBotonInsertar() {
    this.firestoreService.insertar("juegos", this.JuegosBD).then(() => {
      console.log('Juego creado correctamente!');
      this.JuegosBD= {} as Juego;
    }, (error) => {
      console.error(error);
    });
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

 
  


  


}
