import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  paises:any[]=[];

  usuario ={
    nombre: 'edilberto',
    apellido: 'herrera',
    correo: 'edilbertoh7@gmail.com',
    pais:'COL',
    genero:'M'
  }

  constructor(private paisservice: PaisService) {


  }

  ngOnInit(): void {
    this.paisservice.getPaises()
    .subscribe((paises:any)=>{
      this.paises = paises;
      /**el metodo unshift perimte colocar un valor en la primera posicion  */
      this.paises.unshift({
        nombre:'Seleccione Pais',
        codigo: ''
      })


  console.log(paises);

    });
  }

  guardar(forma:NgForm ){

    /** esta validacion se hace para que se recorran todos los
     * elementos del formulario y detectar cual no cumple con las validaciones */
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);


  }

}
