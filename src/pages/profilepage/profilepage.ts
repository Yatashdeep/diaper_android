import { Component } from '@angular/core';
import { getScrollData } from 'ionic-angular/umd/components/input/input';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import{ ServiceProvider }from'../../providers/service/service';
import{ Observable }from'rxjs/Rx'

/**
 * Generated class for the ProfilepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepage',
  templateUrl: 'profilepage.html',
})
export class ProfilepagePage {

  UserData

      Usrfirstname
      Usrlastname
      Usrmobile
      Usremail
      Usrgender  
      Usrbirth

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController) {
    
  }
 
  ngOnInit(){
   
  }

  ionViewWillEnter(){
    this.UserData=[];
    this.getData();
  }

  getData(){
    let loading=this.loadingCtrl.create({    
      spinner:'hide',
      content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
      cssClass:'transparent' 
    });
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(()=>this.service.UserDetailByID()).subscribe(data=>{
      this.UserData=data.message; 
      this.Usrfirstname=data.message[0].firstname;
      this.Usrlastname=data.message[0].lastname;
      this.Usrmobile=data.message[0].mobile;
      this.Usremail=data.message[0].email;
      this.Usrgender=data.message[0].gender;
      this.Usrbirth=data.message[0].birth;
      loading.dismiss();
    },err => {
      loading.dismiss();
      this.toastCtrl.create({  message: "No internet connection", duration: 4000, position: 'middle' }).present(); 
    }) 
  }

  UsrSubmitBtn(){
    if(this.Usrfirstname=="" || this.Usrfirstname==undefined){
      this.toastCtrl.create({  message: "First name is required", duration: 4000, position: 'middle' }).present();  return;  
    }
    if(this.Usrlastname=="" || this.Usrlastname==undefined){
      this.toastCtrl.create({  message: "Last name is required", duration: 4000, position: 'middle' }).present();  return;  
    }
    if(this.Usrbirth=="" || this.Usrbirth==undefined){
      this.toastCtrl.create({  message: "Birth is required", duration: 4000, position: 'middle' }).present();  return;  
    }
    if(this.Usrgender=="" || this.Usrgender==undefined){
      this.toastCtrl.create({  message: "Gender is required", duration: 4000, position: 'middle' }).present();  return;  
    }
    if(this.Usrmobile=="" || this.Usrmobile==undefined){
      this.toastCtrl.create({  message: "Mobile number is required", duration: 4000, position: 'middle' }).present();  return;  
    }
 
    let loading=this.loadingCtrl.create({    
      spinner:'hide',
      content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
      cssClass:'transparent' 
    });  
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(()=>this.service.UserDetailUpdateByID(this.Usrfirstname,this.Usrlastname,this.Usrbirth,this.Usrgender,this.Usrmobile, this.Usremail)).subscribe(data=>{
      loading.dismiss();
      /*
      if(data.status==1) {
      this.UserData=data.getdata;  
      this.Usrfirstname=data.getdata[0].firstname;
      this.Usrlastname=data.getdata[0].lastname;
      this.Usrmobile=data.getdata[0].mobile;
      this.Usremail=data.getdata[0].email;
      this.Usrgender=data.getdata[0].gender;
      this.Usrbirth=data.getdata[0].birth;
      }
      */
      this.toastCtrl.create({  message: data.message, duration: 4000, position: 'middle' }).present(); 
      return;
    },err => {
      loading.dismiss();
      this.toastCtrl.create({  message: "No internet connection", duration: 4000, position: 'middle' }).present();  return; 
    }) 
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepagePage');
  }

}
