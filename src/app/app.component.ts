import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'; //Importo el paquete completo de firebase
import { Configurations } from '../configuration'; //traigo el archivo de configuracion general

/*
ELIMINAMOS LAS REFERENCIAS A PAGINAS NO USADAS PARA TRABAJAR CON LAZY LOADING
*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = 'LoginPage'; //Modifico la pagina de inicializacion con lazy loading como atributo publico

  public pages: Array<{title: string, component: string}>; //Atributo publico que declara variables

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation ** MENU PARA LA NAVEGACION **
    this.pages = [
      { title: 'Home', component: 'HomePage' } ,
      { title: 'List', component: 'listPage' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //inicia firebase
      firebase.initializeApp(Configurations.firebaseConfig);

      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
