import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  //se hace la referencia local al formulario de
  persona:any;
   notext=false;
  nomayor=false;
  forma: FormGroup;
  nombre  = 'edilbertos';
  apellido= 'Herrera';
  /**arreglo para comprobar datos */
  data=[
    {nombre:'edy',
     apellido:'herrera'},
     {nombre:'mireya',
      apellido:'rojas'}
  ];



  //se hace uso de formbuilder para facilitar el manejo de los formularios
  constructor( private fb:FormBuilder,private validador:ValidadoresService,
              private pais: PaisService) {

    console.log('quedo en el video 24 falta verlo');

    this.crearFromulario();
    this.cargaDataFormulario();//carga la informacion al formulario
    this.getdatos();
   }

  ngOnInit(): void {
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  /**metodo para validad si el campoest aquedando vacio */
  getnombreNovalido(que:string){
    return this.forma.get(que).invalid && this.forma.get(que).touched
  }

   getdireccionNovalido(direccion:string,que:string){
    return this.forma.get(`${direccion}.${que}`).invalid && this.forma.get(`${direccion}.${que}`).touched
  }
  get noapellido(){// funcion para no permitir el apellido herrera
    return this.forma.controls.apellido.errors;
  }
  getdatos(){
    this.pais.getdata().subscribe((data:any)=>{
    //  nombre: data.nombre,

    console.log(data);
    this.persona=data[0];

            this.forma.reset({

            nombre:   this.persona.nombre,
            apellido: this.persona.apellido,
            correo:   this.persona.correo,
            direccion:{
            distrito: this.persona.direccion.distrito,
            ciudad:   this.persona.direccion.ciudad
          }
       });
    })
  }

  //metodo que crea el formulario sera llamado en el costructor
  crearFromulario(){
    this.forma=this.fb.group({
     /* nombre:   [this.nombre],
      apellido: [this.apellido],
      correo:   ['edilbertohps36@gmail.com'],*/

      nombre:   ['',[Validators.required, Validators.minLength(5) ]],
      apellido: ['',[Validators.required,this.validador.noHerrera ]],
      correo:   ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      direccion: this.fb.group({
        distrito: ['',[Validators.required, Validators.minLength(5) ]],
        ciudad  : ['',[Validators.required, Validators.minLength(5) ]],
      }),
      pasatiempos: this.fb.array( [] )
    });

  }

  cargaDataFormulario(){
    // this.forma.setValue({
    this.forma.reset({

  nombre:   "EDILBERTO",
  apellido: "HERRERA",
  correo:   "edilbertohps36@gmail.com",
  direccion:{
    distrito: 'agublanca',
    ciudad:   'palmira'
  }
   });

   ['trabajar','jugar','bailar','reir'].forEach(valor=>this.pasatiempos.push( this.fb.control(valor) ) );


  }

  agregarpasatiempo(){
    // hago uso del getter pasatiempos
    this.pasatiempos.push( this.fb.control('',Validators.required) )
  }
  borrarpasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){

    //validaciones para los campos ej cantidad de caractere que no esten vacios

    // if (this.forma.invalid) {
    //   return Object.values(this.forma.controls).forEach(control=>{
    //     control.markAsTouched();
    //   });
    // }// cuando no hay grupos anidados
    console.log(this.forma.value);
    console.log('hola');



    console.log(this.forma.controls.apellido.errors);

    if (this.forma.invalid) {
     return  Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
      });

    }

    this.pais.crearPersona(this.forma.value).subscribe((data:any)=>{
      console.log(data);

    })
    //muestra el contenido del formulario

    this.forma.reset({
      nombre:'sin nombre'
    })

  }

  validacantidad(valor:any){
  if(isNaN(valor) || !valor){
    this.notext=true;
  }else{
    this.notext=false;
    if (valor > 100) {
      this.nomayor=true;
    }else{
      this.nomayor=false;
    }
  }
  }

}
