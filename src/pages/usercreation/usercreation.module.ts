import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsercreationPage } from './usercreation';

@NgModule({
  declarations: [
    UsercreationPage,
  ],
  imports: [
    IonicPageModule.forChild(UsercreationPage),
  ],
})
export class UsercreationPageModule {}
