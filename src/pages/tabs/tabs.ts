import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListdiaperPage } from '../listdiaper/listdiaper';
import { RecentviewPage } from '../recentview/recentview';
import{NotificationpagePage}from'../notificationpage/notificationpage'
import { ProfilepagePage } from '../profilepage/profilepage';
import { HomePage } from '../home/home';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = ListdiaperPage;
  tab2Root: any = RecentviewPage;
  tab3Root:any=NotificationpagePage;
  tab4Root:any=ProfilepagePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
