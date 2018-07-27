import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the NuevoTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-ticket',
  templateUrl: 'nuevo-ticket.html',
})
export class NuevoTicketPage {

  public prioridad;
  public nombre;
  public imagen;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
  }
  public tomarFoto(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoTicketPage');
  }

  public nuevoTicket(){
    let nuevoDato ={
      estado:0,
      nombre: this.nombre,
      prioridad: this.prioridad
    }
    this.api.addTicket(nuevoDato,(resultado) => {
      this.navCtrl.pop();
    });
  }

}
