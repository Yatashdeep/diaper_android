import { Component,ViewEncapsulation } from '@angular/core';
import { NavController ,AlertController,LoadingController,Events} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import{ServiceProvider}from'../../providers/service/service'
import{Observable}from'rxjs/Rx'
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
email
password
  constructor(public event:Events,public service:ServiceProvider,public loadingCtrl:LoadingController,public navCtrl: NavController,public alertCtrl:AlertController) {
    var user=0 
    this.event.publish('user:created',user,Date.now())
  }
  register()
  {
   


    this.navCtrl.push(RegisterPage)
  }
  checkalert(){
   let alert = this.alertCtrl.create({
    title: 'Forget Password',
    inputs: [
      {
        name: 'Email',
        placeholder: 'Type your Email-id...'
      }
    ],
    buttons: [
      {
        text: 'Send',
        handler: data => {
          console.log('',data.Email)
          this.forgetpassword(data.Email)
        }
      }
     
    ]
  });
  alert.present();
}
forgetpassword(email)
{
  let loading=this.loadingCtrl.create({
    spinner:'hide',
    content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
    cssClass:'transparent' 
  })
  loading.present()
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.forgetpassword(email))
  .subscribe(data=>{
    console.log('----',data.message)
    if(data.message=='Mail Sent Successfully')
    {
    let alert = this.alertCtrl.create({
      title: 'Mail Sent Succesfully',
  
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            
          }
        }
       
      ]
    });
    alert.present();
  }
  else{
    let alert = this.alertCtrl.create({
      title: 'Email Incorrect',
     
      buttons: [
        {
          text: 'Ok',
          handler: data => {
           
          }
        }
       
      ]
    });
    alert.present();
  }
    loading.dismiss()
  }) 
}

signin()
{
  let loading=this.loadingCtrl.create({ 
    spinner:'hide',
    content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
    cssClass:'transparent' 
  })
  loading.present()
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.login(this.email,this.password))
  .subscribe(data=>{ 
    if(data.message=='logged in')
    {
      console.log('firstname',data.data.firstname);
      localStorage.setItem('Firstname',data.data.firstname);
      localStorage.setItem('user_id',data.data.user_id);
    let alert = this.alertCtrl.create({
      title: 'Logged Succesfully!',
  
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            var user=1
            this.event.publish('user:created',user,Date.now())
            this.navCtrl.setRoot(TabsPage)
          }
        }
       
      ]
    });
    alert.present();
  }
  else{
    let alert = this.alertCtrl.create({
      title: 'Email/Password incorrect',
     
      buttons: [
        {
          text: 'Ok',
          handler: data => {
           
          }
        }
       
      ]
    });
    alert.present();
  }
 



    loading.dismiss()
  }) 
}
}
