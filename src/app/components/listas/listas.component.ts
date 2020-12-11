import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList
  @Input() terminada = true

  constructor(
    public deseosServices: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }


  listaSeleccionada(lista: Lista) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista(lista: Lista) {


    this.deseosServices.borrarLista(lista);
  }


  async editarLista(item: Lista) {

    // this.router.navigateByUrl('/tabs/tab1/agregar');

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: item.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
            console.log('cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.titulo.length == 0) {
              return;
            }

            item.titulo = data.titulo
            this.deseosServices.guardarStorage()
            this.lista.closeSlidingItems();
          }
        }
      ]
    });


    alert.present();

  }

}
