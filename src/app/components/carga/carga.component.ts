import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargarImagenesService } from 'src/app/services/cargar-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  archivo: FileItem[] = [];
  estaSobreElemento = false;
  constructor( public cis: CargarImagenesService ) { }

  ngOnInit(): void {
  }

  cargarImagen() {
    this.cis.cargarImagenesFirebase( this.archivo )
  }

  mouseSobreElemento( evento ) {
    console.log(evento);
  }

  limpiarArchivo(){
    this.archivo = [];
  }
}
