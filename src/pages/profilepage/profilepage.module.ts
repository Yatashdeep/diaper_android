import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilepagePage } from './profilepage';

@NgModule({
  declarations: [
    ProfilepagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilepagePage),
  ],
})
export class ProfilepagePageModule {}
