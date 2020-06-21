import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{RegisterPage}from'../pages/register/register'
import{UsercreationPage}from'../pages/usercreation/usercreation'
import{TabsPage}from'../pages/tabs/tabs'
import{ListdiaperPage}from'../pages/listdiaper/listdiaper'
import{RecentviewPage}from'../pages/recentview/recentview'
import{DetaildiaperPage}from'../pages/detaildiaper/detaildiaper'
import { ReviewratePage } from '../pages/reviewrate/reviewrate';
import{NotificationpagePage}from'../pages/notificationpage/notificationpage'
import{ProfilepagePage}from'../pages/profilepage/profilepage'
import { Geolocation } from '@ionic-native/geolocation';
import { StarRatingModule } from 'ionic3-star-rating';
import{ReviewsummaryPage}from'../pages/reviewsummary/reviewsummary'
import { RatecommentPage } from '../pages/ratecomment/ratecomment';
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule } from '@angular/common/http';
import{ HttpModule}from'@angular/http'
import {Camera  } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,

    UsercreationPage,
    TabsPage,
    ListdiaperPage,
    RecentviewPage,
    DetaildiaperPage,
    ReviewratePage,
    NotificationpagePage,
    ProfilepagePage,
    ReviewsummaryPage,
    RatecommentPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    StarRatingModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    UsercreationPage,
    TabsPage,
    ListdiaperPage,
    RecentviewPage,
    DetaildiaperPage,
    ReviewratePage,
    NotificationpagePage,
    ProfilepagePage,
    ReviewsummaryPage,
    RatecommentPage

  ],
  providers: [
    Device,
    OneSignal,
    FileTransfer,
    Camera,
    StatusBar,
    SplashScreen,Geolocation,ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
