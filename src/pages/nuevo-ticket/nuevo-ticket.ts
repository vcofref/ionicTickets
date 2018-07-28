import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { LoadingController, ToastController} from 'ionic-angular'

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
  public image='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public camera: Camera,
    public loading: LoadingController,
    public toast: ToastController
  ) {
  }
  public tomarFoto(){
    const opcionesCamara: CameraOptions={
      quality:100, //calidad de la foto
      destinationType: this.camera.DestinationType.DATA_URL, //como tratare la foto
      encodingType: this.camera.EncodingType.JPEG, //Formtato para la foto
      mediaType: this.camera.MediaType.PICTURE, //para ver si sera foto o video
      correctOrientation: true
    }

    this.camera.getPicture(opcionesCamara).then((datosImg) => {
      this.image = 'data:image/jpeg;base64,' + datosImg;
    },(error)=>{
      let toast = this.toast.create({
        message:'Error al tomar la foto',
        duration: 3000
      });
      toast.present();
    });

  }

  ionViewDidLoad() {}

  public nuevoTicket() {
    //Crea el objeto que se va a subir
    let nuevoDato = {
      estado: 0,
      nombre: this.nombre,
      prioridad: this.prioridad,
      image: null
    }

    //Crea el loading y lo muestra
    let loading = this.loading.create({
      content: 'Subiendo archivo y ticket...'
    });
    loading.present();

    //Crea una referencia de upload y se establece el formato en que se va a subir
    let ref = this.api.subirStorage(this.image);
    let upload = ref.putString(this.image, 'data_url');

    //Observa los cambios en el upload para realizar alguna acción
    upload.on('state_changed', (snapshot:any) => {
      let progreso = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      loading.setContent('Subiendo (' + progreso + '%)');
    }, (error) => {
      loading.dismiss();
      let toast = this.toast.create({
        message: 'Error al subir el archivo',
        duration: 3000
      });
      toast.present();
    }, () => {
      //Cuando termina obtiene la URL pública del archivo, para asi guardar esa URL en el objeto que se va a subir a Realtime Database
      upload.snapshot.ref.getDownloadURL().then((url) => {
        nuevoDato.image = url;
        this.api.addTicket(nuevoDato, (resultado) => {
          //Saca el loading y vuelve a la página inicial
          loading.dismiss();
          this.navCtrl.pop();
        });
      });
    });
  }
}
