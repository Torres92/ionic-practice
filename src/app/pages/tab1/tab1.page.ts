import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosServices: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {

  }


  async agregarLista() {

    // this.router.navigateByUrl('/tabs/tab1/agregar');

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length == 0) {
              return;
            }

            const listaId = this.deseosServices.crearLista(data.titulo);

            // router to id of the lista to add
            this.router.navigateByUrl(`/tabs/tab1/agregar/${  listaId  }`);
          }
        }
      ]
    });


    alert.present();

  }


  // listaSeleccionada(lista: Lista){
  //   this.router.navigateByUrl(`/tabs/tab1/agregar/${  lista.id  }`);
  // }
}
