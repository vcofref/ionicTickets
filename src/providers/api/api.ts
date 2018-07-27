import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor() {  }

  public getTickets(){
    return firebase.database().ref('/tickets');
  }

  public addTicket(data, callback){
    return firebase.database().ref('/tickets/').push(data, callback);
  }
}
