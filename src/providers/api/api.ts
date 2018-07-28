import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as randomstring from 'randomstring'; //modulo que permite crear cadenas aleatorias

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor() {  }

  public getTickets() {
    return firebase.database().ref('/tickets');
  }

  //Obtiene un ticket
  public getTicket(id) {
    return firebase.database().ref('/tickets/' + id);
  }

  public addTicket(data, callback){
    return firebase.database().ref('/tickets/').push(data, callback);
  }

  public editTicket(id, data, callback){
    return firebase.database().ref('/tickets/'+id).set(data,callback);
  }

  public delTicket(id, callback){
    return firebase.database().ref('/tickets/'+id).remove(callback);
  }

  public resolvTicket(id, callback){
    let dato ={
      estado: 1
    }
    return firebase.database().ref('/tickets/'+ id).update(dato,callback);
  }

  //Subir un archivo a Firebase Storage y retornar la URL a ese archivo
  public subirStorage(dataURL) {
    let rutaArchivo = '/' + randomstring.generate() + '.jpg';
    return firebase.storage().ref(rutaArchivo);
  }
}
