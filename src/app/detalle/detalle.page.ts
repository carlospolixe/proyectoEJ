import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Router } from "@angular/router";
import { Juego } from '../juego';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id = null;
  document: any = {
    id: "",
    data: {} as Juego
  };
  

  constructor(
      public alertController: AlertController,
      private activatedRoute: ActivatedRoute,
      private firestoreService: FirestoreService, 
      private router: Router) {

  this.firestoreService.consultarPorId("juegos", this.activatedRoute.snapshot.paramMap.get("id")).subscribe((resultado) => {
    // Preguntar si se hay encontrado un document con ese ID
    if(resultado.payload.data() != null) {
      this.document.id = resultado.payload.id
      this.document.data = resultado.payload.data();
      // Como ejemplo, mostrar el título de la tarea en consola
      console.log(this.document.data.titulo);
    } else {
      // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
      this.document.data = {} as Juego;
    } 
    if (this.id == "Nuevo") {
      document.getElementById("botonBorrar").innerHTML = "Volver";
      document.getElementById("botonModificar").innerHTML = "Añadir";
    }
  });
  }

  bothome(){
    this.router.navigate(["/home"]);
  }



  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }




  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Va usted a BORRAR',
      message: '¿Esta usted seguro que quiere borra el <strong>Juego?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.clicBotonBorrar();
          }
        }
      ]
    });

    await alert.present();
  }



  
  clicBotonBorrar() {
    if (this.id != "Nuevo") {
      this.firestoreService.borrar("juegos", this.id).then(() => {
        this.router.navigate(["/home"]);
      }, (error) => {
        console.error(error);
      });
    } else{
      this.router.navigate(["/home"]);
    }
  }

 



  
  clicBotonModificar() {
    if (this.id != "Nuevo") {
      this.firestoreService.actualizar("juegos", this.id, this.document.data).then(() => {
        this.router.navigate(["/home"]);
      }, (error) => {
        console.error(error);
      });
    } else{
      this.firestoreService.insertar("juegos", this.document.data).then(() => {
        console.log('Personaje creado correctamente!');
        this.router.navigate(["/home"]);
      }, (error) => {
        console.error(error);
      });
    }
  }


  



}
