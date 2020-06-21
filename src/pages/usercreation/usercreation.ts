import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import{ServiceProvider}from'../../providers/service/service'
import { HomePage } from '../home/home';
/**
 * Generated class for the UsercreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usercreation',
  templateUrl: 'usercreation.html',
})
export class UsercreationPage {

  constructor(public events:Events,public service:ServiceProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
   
    var user=1
    this.events.publish('user:created',user,Date.now())
    this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsercreationPage');
  }
  navigatetolist(){
   
    this.navCtrl.setRoot(HomePage)
  }

}
