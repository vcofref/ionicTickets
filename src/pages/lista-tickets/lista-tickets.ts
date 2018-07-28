import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ListaTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-tickets',
  templateUrl: 'lista-tickets.html',
})
export class ListaTicketsPage {

  public tickets = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api:ApiProvider,
    public loadingCtrl: LoadingController
  ) {
    let cargando = this.loadingCtrl.create({
      content: "Cargando"
    });
    cargando.present();

    this.api.getTickets().on('value', (snapshot) => {
      this.tickets=[];
      snapshot.forEach((row:any) =>{
        let id=row.key;
        let data = row.val();
        //console.log(id,data);

        if (data.estado == 0) {
          this.tickets.push({
            id: id,
            nombre: data.nombre,
            estado: data.estado,
            prioridad: data.prioridad
          });
        }

      });
      cargando.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTicketsPage');
  }

  public detalleTicket(id){
    this.navCtrl.push('EditarTicketPage',{
      id:id
    });
  }

  public addTicket(){
    this.navCtrl.push("NuevoTicketPage");
  }

}
