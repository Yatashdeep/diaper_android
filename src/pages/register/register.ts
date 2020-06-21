import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { UsercreationPage } from '../usercreation/usercreation';
import { ListdiaperPage } from '../listdiaper/listdiaper';
import{Observable}from'rxjs/Rx'
import{ServiceProvider}from'../../providers/service/service'
import{FormBuilder,FormGroup,Validator, Validators,AbstractControl }from'@angular/forms'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  
  addchilddata=[]
  
  count=0
  countshow:boolean
  signupform
  
 
  constructor(public alertCtrl:AlertController,public formBuilder:FormBuilder,public service:ServiceProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
     let  mobpattern = /[0-9\+\-\ ]/;
    this.signupform=formBuilder.group({
      mail:['',Validators.compose([Validators.maxLength(30),Validators.pattern(emailRegex),Validators.minLength(1),Validators.required])],
      password:['',Validators.compose([Validators.maxLength(30),Validators.pattern(passwordRegex),Validators.minLength(1),Validators.required])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(mobpattern),Validators.minLength(1),Validators.required])],
      Gender:['',Validators.required],
      birthdate:['',Validators.required],
     
      confirmPassword:['',Validators.required],
      childfirstname:[''],
      childbirthdate:[''],
      childGender:['']


    }, {
      validator: RegisterPage.MatchPassword
    })
  
  }
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  registernavigate()
  {
    // console.log(this.signupform.controls["mail"].value)
    // console.log(this.signupform.controls["password"].value)
    // console.log(this.signupform.controls["firstname"].value)
    // console.log(this.signupform.controls["mobile"].value)
    // console.log(this.signupform.controls["lastname"].value)
    // console.log(this.signupform.controls["Gender"].value)
    // console.log(this.signupform.controls["birthdate"].value)
    // console.log(this.signupform.controls["confirmPassword"].value)

    // console.log(this.signupform.controls["childfirstname"].value)
    // console.log(this.signupform.controls["childbirthdate"].value)
    // console.log(this.signupform.controls["childGender"].value)
   
   this.addchilddata.push({
    fullnamechild:this.signupform.controls["childfirstname"].value,
    birthdatechild:this.signupform.controls["childbirthdate"].value,
    genderchild:this.signupform.controls["childGender"].value
   })
   
    console.log('data',this.addchilddata)


    let loading=this.loadingCtrl.create({
      spinner:'hide',
      content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
      cssClass:'transparent' 
    })
    loading.present()
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.service.Signup(this.signupform,this.addchilddata))
    .subscribe(data=>{
      console.log(data)
      loading.dismiss()
      if(data.message=='Email Id exist')
      {
        let alert = this.alertCtrl.create({
          title: 'Email-Id already exist! ',
      
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
      else
      {
      this.navCtrl.push(UsercreationPage); 
      }
    })
    // this.navCtrl.push(UsercreationPage)
  }
  addchild()
  {
    console.log(this.count)
     this.count++ 
     this.countshow=true
   this.addchilddata.push({
    fullnamechild:null, 
    birthdatechild:String,
    genderchild:String
  })
  }
  closechild()
  {
   this.addchilddata.pop()  
  if(this.addchilddata.length==0)
  {
  this.countshow=false
  }
  }

}
