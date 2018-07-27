import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarTicketPage } from './editar-ticket';

@NgModule({
  declarations: [
    EditarTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarTicketPage),
  ],
})
export class EditarTicketPageModule {}
