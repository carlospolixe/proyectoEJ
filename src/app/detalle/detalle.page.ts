import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Router } from "@angular/router";
import { Juego } from '../juego';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';



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
      private callNumber: CallNumber,
      private SocialSharing: SocialSharing,
      private loadingController: LoadingController,
      private toastController: ToastController,
      private imagePicker: ImagePicker,
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
      document.getElementById("botonAddimg").innerHTML = "Añadir Imagen";
    }
  });
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



  async uploadImagePicker(){
    // Mensaje de espera mientras se sube la imagen
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    // Mensaje de finalización de subida de la imagen
    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    // Comprobar si la aplicación tiene permisos de lectura
    this.imagePicker.hasReadPermission().then(
      (result) => {

   // Si no tiene permiso de lectura se solicita al usuario
   if(result == false){
    this.imagePicker.requestReadPermission();
  }
  else {
    // Abrir selector de imágenes (ImagePicker)
    this.imagePicker.getPictures({
      maximumImagesCount: 1,  // Permitir sólo 1 imagen
      outputType: 1           // 1 = Base64
    }).then(
      (results) => {  // En la variable results se tienen las imágenes seleccionadas
        // Carpeta del Storage donde se almacenará la imagen
        let nombreCarpeta = "imagenes";
        // Recorrer todas las imágenes que haya seleccionado el usuario
        //  aunque realmente sólo será 1 como se ha indicado en las opciones
        for (var i = 0; i < results.length; i++) {      
          // Mostrar el mensaje de espera
          loading.present();
          // Asignar el nombre de la imagen en función de la hora actual para
          //  evitar duplicidades de nombres        
          let nombreImagen = `${new Date().getTime()}`;
          // Llamar al método que sube la imagen al Storage
          this.firestoreService.addImagen(nombreCarpeta, nombreImagen, results[i])
            .then(snapshot => {
              snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                  // En la variable downloadURL se tiene la dirección de descarga de la imagen
                  console.log("downloadURL:" + downloadURL);
                  this.document.data.imagen=downloadURL;
                  // Mostrar el mensaje de finalización de la subida
                  toast.present();
                  // Ocultar mensaje de espera
                  loading.dismiss();
                })
            })
        }
      },
      (err) => {
        console.log(err)
      }

      );
    }
  }, (err) => {
    console.log(err);
  });
}

async deleteFile(fileURL) {
  const toast = await this.toastController.create({
    message: 'File was deleted successfully',
    duration: 3000
  });
  this.firestoreService.deleteImagen(fileURL)
    .then(() => {
      toast.present();
    }, (err) => {
      console.log(err);
    });
}

msgcomp(index):string{
  var msg = "INSTANJUEGO"+ "\n" + this.document.data.descripcion +"\n" + this.document.data.imagen2 +"\n"+"PRECIO:" + this.document.data.precio +"€" ;
  return msg.concat(" \n Compartido  a traves INSTANJUEGO !");
}

whatsappShare(index){
  var msg  = this.msgcomp(index);
   this.SocialSharing.shareViaWhatsApp(msg, null, null);
 }

 
twitterShare(index){
  var msg  = this.msgcomp(index);
  this.SocialSharing.shareViaTwitter(msg, null, null);
}

facebookShare(index){
  var msg  = this.msgcomp(index);
   this.SocialSharing.shareViaFacebook(msg, null, null);
}

// comprobar no funciona error en el 
numeroTLF(){
  this.callNumber.callNumber("634283723", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

onpickupClick(){
  this.router.navigate(['pickup-location']);
}


}
