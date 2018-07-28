import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EditarTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-ticket',
  templateUrl: 'editar-ticket.html',
})
export class EditarTicketPage {

  public prioridad;
  public nombre;
  public image;
  public datos;
  public id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    let id = this.navParams.get('id');
    this.api.getTicket(id).once('value').then((datos:any) => {
      let datos_procesados = datos.val();
      this.id = datos.key;
      this.datos = datos_procesados;

      this.nombre = datos_procesados.nombre;
      this.prioridad = datos_procesados.prioridad;
    });
  }

  ionViewDidLoad() {}

  public editarTicket(){
    let datos={
      estado:0,
      nombre:this.nombre,
      prioridad:this.prioridad
    }
    this.api.editTicket(this.id,datos,()=>{
      this.navCtrl.pop();
    });
  }

  public eliminarTicket(){
    this.api.delTicket(this.id,()=>{
      this.navCtrl.pop();
    });
  }
  public resolverTicket() {
    this.api.resolvTicket(this.id, () => {
      this.navCtrl.pop();
    });
  }


}
