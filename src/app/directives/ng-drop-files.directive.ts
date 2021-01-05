import { Directive, EventEmitter, ElementRef, HostListener,
          Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivo: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener( 'dragover', ['$event'] )
  public onDragEnter( event: any) {
    this.mouseSobre.emit( true );
    this.prevenirDetener(event);
  }
  @HostListener( 'dragleave', ['$event'] )
  public onDragleave( event: any) {
    this.mouseSobre.emit( false );
  }
  @HostListener( 'drop', ['$event'] )
  public onDrop( event: any) {
    const transferencia = this.getTransferir( event );
    if (!transferencia) {
      return;
    }
    this.extraerArchivo(transferencia.files);
    this.prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  private getTransferir( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivo(archivosLista: FileList) {
    for(const propiedad in Object.getOwnPropertyNames( archivosLista) ) {
      const archivoTemporal = archivosLista[propiedad];
      if(this.archivoAceptado(archivoTemporal)){
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivo.push(nuevoArchivo);
      }
    }
    console.log(this.archivo);
  }

  // Validaciones
  private archivoAceptado(archivo: File): boolean {
    if (!this.revisarSiExiste(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    }else{
      return false;
    }
  }

  private prevenirDetener( event: any ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private revisarSiExiste( nombreArchivo: string): boolean {
    for(const archivo of this.archivo) {
      if( archivo.nombreArchivo === nombreArchivo) {
         console.log('El archivo ' + nombreArchivo + ' ya existe' );
         return true;
      }
    }
    return false;
  }

  private esImagen( tipoArchivo: string ): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image') ;
  }
}
