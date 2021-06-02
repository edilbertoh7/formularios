import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe( map( (resp:any)=>{
      return resp.map(pais=>{
        return {
          nombre: pais.name,
          codigo: pais.alpha3Code
        }
      });
    } ))
    ;
  }
  getdata(){
    return this.http.get(`https://crudangular-5a02c-default-rtdb.firebaseio.com/datos.json`)
    .pipe(
      map(this.crearArreglo)
    );
  }
  getruta(sufijo:string){
     const url=`https://crudangular-5a02c-default-rtdb.firebaseio.com${sufijo}`;
     return url;
   }

  crearPersona(persona:any){
    //console.log(heroe.id);
     return this.http.post(`${this.getruta('/datos.json')}`,persona)
  }


  private crearArreglo(personasobj: object){
  if (!personasobj) {
    personasobj=[];
  }
  const personas= [];
  //console.log(personas);
  //console.log(personasobj);
  Object.keys(personasobj).forEach(key=>{
    const persona=personasobj[key];
    //console.log(personasobj[key]);
    persona.id=key;
    personas.push(persona);
  });
return personas;
}




}
