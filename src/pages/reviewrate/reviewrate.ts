import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController,LoadingController, ToastController  } from 'ionic-angular';
import { ListdiaperPage } from '../listdiaper/listdiaper';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import{ServiceProvider}from'../../providers/service/service';
import { ImagePicker } from '@ionic-native/image-picker';
import{Observable}from'rxjs/Rx'
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the ReviewratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviewrate',
  templateUrl: 'reviewrate.html',
})
export class ReviewratePage {
  Firstname
  count1=0
  count2=0
  count3=0
  count4=0

  array_img=[];
  ImageUrl 
  imageResponse=[];

  place_data
  destinylng
  destinylat 
  index

  TypeMen:any="no";
  TypeNeutral:any="no";
  TypeFamily:any="no";
  Typewomen:any="no";

  CleaninessRate:any;

  public ToggleChangeTable: boolean=false;  public ToggleChangeRoom: boolean=false;   public ToggleChild: boolean=false; 
  public ToggleFreindly: boolean=false;   public ToggleNursing: boolean=false;    

   ToggleChangeTable1="no";   ToggleChangeRoom1="no";    ToggleChild1="no";   ToggleFreindly1="no";    ToggleNursing1="no"; 

  constructor(public actionSheetCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public filetransfer: FileTransfer,public camera:Camera,public service:ServiceProvider,private imagePicker: ImagePicker,public loadingCtrl:LoadingController,private toastCtrl: ToastController) { 
    this.place_data=this.navParams.get('place_data');
    this.destinylng=this.navParams.get('destinylng');
    this.destinylat=this.navParams.get('destinylat');
    this.index=this.navParams.get('index');  
      console.log('place_data=',this.place_data)
      console.log('lng=',this.destinylng)
      console.log('lat=',this.destinylat)
      console.log('index=',this.index)
      this.ToggleChangeTable = false;  this.ToggleChangeRoom = false; this.ToggleChild = false; this.ToggleFreindly = false; this.ToggleNursing = false;

      if(this.ToggleChangeTable) { this.ToggleChangeTable1="yes";   }  else {  this.ToggleChangeTable1="no";  } 
      if(this.ToggleChangeRoom) { this.ToggleChangeRoom1="yes";   }  else {  this.ToggleChangeRoom1="no";  } 
      if(this.ToggleChild) { this.ToggleChild1="yes";   }  else {  this.ToggleChild1="no";  } 
      if(this.ToggleFreindly) { this.ToggleFreindly1="yes";   }  else {  this.ToggleFreindly1="no";  } 
      if(this.ToggleNursing) { this.ToggleNursing1="yes";   }  else {  this.ToggleNursing1="no";  }  
  }
  
  ionViewWillEnter() { 
    this.CleaninessRate=1;  
    this.ImageUrlLink();       
   //this.array_img.push({ Image:"filename_a2s547" });    
   }    

  ImageUrlLink() {    this.ImageUrl=this.service.ImageUrlLink();   }

  ionViewDidLoad() {
    this.Firstname=localStorage.getItem('Firstname')
  
    console.log('ionViewDidLoad ReviewratePage');
  }

  buttonactive(id)
  {
   if(id==1)
   {
   this.count1++
   if(this.count1%2!=0)
   {
   document.getElementById('a').style.backgroundColor='#228B22'
   document.getElementById('a').style.color='#fff'
   this.TypeMen="yes";  
   }
   else
   {
    this.TypeMen="no";
    document.getElementById('a').style.backgroundColor='transparent'
    document.getElementById('a').style.color='grey'
   } 
  } 
   else if(id==2)
   {
   this.count2++
   if(this.count2%2!=0)
   {
   document.getElementById('b').style.backgroundColor='#228B22'
   document.getElementById('b').style.color='#fff'
   this.Typewomen="yes";
   }
   else
   {
    document.getElementById('b').style.backgroundColor='transparent'
    document.getElementById('b').style.color='grey'
    this.Typewomen="no";
   }
  
  } else if(id==3)
   {
    this.count3++
   if(this.count3%2!=0)
   {
    this.TypeNeutral="yes";
    document.getElementById('c').style.backgroundColor='#228B22'
    document.getElementById('c').style.color='#fff'
   } 
   else
   {
     this.TypeNeutral="no";
    document.getElementById('c').style.backgroundColor='transparent'
    document.getElementById('c').style.color='grey' 
   }

  
  
  }
   else if(id==4)
   {
    this.count4++
    if(this.count4%2!=0)
    {
    document.getElementById('d').style.backgroundColor='#228B22'
    document.getElementById('d').style.color='#fff'
    this.TypeFamily="yes";
    } 
    else 
    {
      this.TypeFamily="no"; 
      document.getElementById('d').style.backgroundColor='transparent'
      document.getElementById('d').style.color='grey' 
    }
  }


  }
  navigatetoback(){
    this.navCtrl.setRoot(ListdiaperPage)
  }
  uploadpicture()
  {
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
       this.gallery()
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
         this.camera1()
        }
      } 
    ]
    })
    actionsheet.present(); 
  }

  gallery() {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.uploadimage_rating(imageData);
    }, (err) => {
      this.toastCtrl.create({  message: "This accessory is not supported by the device and cannot be used.", duration: 3000, position: 'middle' }).present();  
    })
  }
  
  camera1(){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.uploadimage_rating(imageData);
  }, (err) => {
    this.toastCtrl.create({  message: "This accessory is not supported by the device and cannot be used.", duration: 3000, position: 'middle' }).present();  
  })
  }
  
  gallery2(){
    var options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,
 
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,
      // quality of resized image, defaults to 100
      quality: 25,
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1,

      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true 
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        alert("results[i]=="+results[i]);
       // this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
      alert(JSON.stringify(err));
    });
  }

  uploadimage_rating(ImgesP) {
         const filetransfers: FileTransferObject = this.filetransfer.create();
         let options: FileUploadOptions = {
           fileKey: 'file',
           fileName: 'filename.jpg',
           chunkedMode: false,    
           mimeType: "multipart/form-data",
           params:{'upload_preset':'wjnegjnc'}
          //  params: { 'upload_preset': 'waaxcfsv' }
         } 
         filetransfers.upload(ImgesP,'https://api.cloudinary.com/v1_1/loginworks/upload', options)
           .then((data) => {
            let imgProfile= JSON.parse(data.response).public_id;
            this.array_img.push({ Image:imgProfile });
           }, (err) => {
            this.toastCtrl.create({  message: "Please wait a few minutes and then try uploading your image file again.", duration: 5000, position: 'middle' }).present();  
           })
  }

  logRatingChange(ev){
    console.log("ev==",ev);
    this.CleaninessRate=ev; 
  }

  OnChangeTable(){   
    if(this.ToggleChangeTable) { this.ToggleChangeTable1="yes";   }  else {  this.ToggleChangeTable1="no";  } 
  }
  OnChangeRoom(){
    if(this.ToggleChangeRoom) { this.ToggleChangeRoom1="yes";   }  else {  this.ToggleChangeRoom1="no";  } 
  }
  OnChangeChild(){
    if(this.ToggleChild) { this.ToggleChild1="yes";   }  else {  this.ToggleChild1="no";  } 
  }
  OnChangeFriendly(){
    if(this.ToggleFreindly) { this.ToggleFreindly1="yes";   }  else {  this.ToggleFreindly1="no";  } 
  }
  
  OnChangeNursing(){
    if(this.ToggleNursing) { this.ToggleNursing1="yes";   }  else {  this.ToggleNursing1="no";  } 
  }

  PostDetail(){ 
  if(this.array_img.length==0){    
  this.toastCtrl.create({  message: "Image is required.", duration: 4000, position: 'middle' }).present();  
  return; 
  }
  var a="no"; var b="no";   var c="no"; var d="no"; 
  var validateType=(a !=this.TypeMen || b !=this.TypeNeutral || c !=this.TypeFamily || d !=this.Typewomen);
  if(!validateType){  
    this.toastCtrl.create({  message: "Please select any one.", duration: 4000, position: 'middle' }).present(); 
    return;  
  }  

    let loading=this.loadingCtrl.create({ 
      spinner:'hide',
      content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
      cssClass:'transparent' 
    });

    var typess=[];
    typess.push({men:this.TypeMen,woman:this.Typewomen,neutral:this.TypeNeutral,children:this.TypeFamily});
    
    var locationss=[];
    locationss.push({lat:this.destinylat,lng:this.destinylng}); 
    loading.present(); 
    Observable.of(loading).flatMap(loading=>loading.present())      
    .flatMap(()=>this.service.rating(typess,this.ToggleChangeTable1,this.ToggleChangeRoom1,this.ToggleChild1,this.ToggleFreindly1,this.ToggleNursing1,this.CleaninessRate.toString(),this.array_img,this.place_data[this.index].address,locationss))
    .subscribe(data=>{  
      this.cleardata();
      this.toastCtrl.create({  message: data.message, duration: 3000, position: 'middle' }).present();  
      console.log("res==",data);
      loading.dismiss();
    },err => {
      loading.dismiss();
      this.toastCtrl.create({  message: "No internet connection", duration: 4000, position: 'middle' }).present(); 
      console.log("err==",err);
    })
    
  }

  cleardata(){
    document.getElementById('a').style.backgroundColor='transparent';
    document.getElementById('a').style.color='grey';
    document.getElementById('b').style.backgroundColor='transparent'
    document.getElementById('b').style.color='grey'
    document.getElementById('c').style.backgroundColor='transparent'
    document.getElementById('c').style.color='grey'
    document.getElementById('d').style.backgroundColor='transparent'
    document.getElementById('d').style.color='grey'
    this.TypeMen="no";this.TypeNeutral="no"; this.TypeFamily="no";this.Typewomen="no";
    this.ToggleChangeTable=false;   this.ToggleChangeRoom=false;   this.ToggleChild=false; 
    this.ToggleFreindly=false;   this.ToggleNursing=false; 
    this.ToggleChangeTable1="no";   this.ToggleChangeRoom1="no";    this.ToggleChild1="no";   this.ToggleFreindly1="no";    this.ToggleNursing1="no";   
    this.array_img=[];
    this.CleaninessRate=1;  
  }


}
