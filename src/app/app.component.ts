import { Component } from '@angular/core';
import { Platform ,Events,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import{RegisterPage}from'../pages/register/register'
import{UsercreationPage}from'../pages/usercreation/usercreation'
import { TabsPage } from '../pages/tabs/tabs';
import{DetaildiaperPage}from'../pages/detaildiaper/detaildiaper'
import { ReviewratePage } from '../pages/reviewrate/reviewrate';
import{ProfilepagePage}from'../pages/profilepage/profilepage'
import { NotificationpagePage } from '../pages/notificationpage/notificationpage';
import { ReviewsummaryPage } from '../pages/reviewsummary/reviewsummary';
import { RatecommentPage } from '../pages/ratecomment/ratecomment';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;  
  constructor(public alertCtrl:AlertController,public device:Device,public oneSignal: OneSignal,public event:Events,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
     console.log("user_id==",localStorage.getItem('user_id'));
   event.subscribe('user:created',(user,time)=>{
     console.log('pikabu='+user)
     localStorage['status']=user
   })  
   if(localStorage['status']==1) { 
     this.rootPage=TabsPage; 
   }
   else if(localStorage['status']==0) { 
     //this.rootPage=HomePage
     this.rootPage=HomePage;    
   }
    platform.ready().then(() => {
      console.log('Device UUID is: ' + this.device.uuid);
    /// alert('uuid'+this.device.uuid)
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     if(platform.is('cordova'))
     {
      this.setupPush(this.device.uuid);
      // this.oneSignal.startInit('92fe35fc-12d2-4a88-96e8-97155d318f65', this.device.uuid);
      // this.oneSignal.handleNotificationOpened().subscribe(data=>{
      //      alert('data'+JSON.stringify(data))
      // })
     }
    });
  }
  setupPush(senderid)
  {
   this.oneSignal.startInit('5c5df3b5-9d48-4035-8e5b-7357ca8f91f6',senderid);
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
   this.oneSignal.handleNotificationReceived().subscribe(data => {
     let msg = data.payload.body;
     let title = data.payload.title;
     let additionalData = data.payload.additionalData;
     this.showAlert(title, msg, additionalData.task);
   });
 
    // Notification was really clicked/opened
   this.oneSignal.handleNotificationOpened().subscribe(data => {
    
     let additionalData = data.notification.payload.additionalData;
     this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    
   });
 
    this.oneSignal.endInit();
  }
  showAlert(title, msg, task) {
    const alert = this.alertCtrl.create({
     
     
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }

}




