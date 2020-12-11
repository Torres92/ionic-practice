import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/list-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(
    private deseosServices: DeseosService,
    private router: ActivatedRoute
  ) {
    const listaId = this.router.snapshot.paramMap.get('listaId')

    this.lista = this.deseosServices.obtenerLista(listaId);

    console.log(this.lista)
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) return;

    const nuevoItem = new ListaItem(this.nombreItem)
    this.lista.items.push(nuevoItem)

    this.nombreItem = '';

    this.deseosServices.guardarStorage();
  }


  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items.filter(itemData => !itemData.completado)
      .length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date()
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null
    }
    this.deseosServices.guardarStorage();
  }

  borrar(i) {

    this.lista.items.splice( i, 1 )
    this.deseosServices.guardarStorage()
  }
}
