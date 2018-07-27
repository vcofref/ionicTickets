import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:string="";
  public pass:string="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    let username = this.email;
    let password = this.pass;
    let cargando = this.loadingCtrl.create({
      content: "Cargando"
    });
    cargando.present();
    firebase.auth().signInWithEmailAndPassword(username,password).then(
      (resultado)=>{
        cargando.dismiss();
        console.log(resultado);
        this.navCtrl.setRoot('ListaTicketsPage');
      },
      (error) => {
        cargando.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error de Autentificacion',
          duration: 3000
        });

        toast.present();
        console.log(error);
      }
    );
    //console.log(username, password);
  }

}
