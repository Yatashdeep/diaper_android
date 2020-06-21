import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DetaildiaperPage } from '../detaildiaper/detaildiaper';
import{ ServiceProvider }from'../../providers/service/service';
import{ Observable }from'rxjs/Rx'

/**
 * Generated class for the RecentviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recentview',
  templateUrl: 'recentview.html',
})
export class RecentviewPage {
 
  namelist 
  ViewList 
  ViewrecentFinal=[];
  ratingVal=[1,2,3,4,5]; 

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController) { 

}

ionViewWillEnter(){
  this.namelist=JSON.parse(localStorage.getItem('namelist'));  
  this.ViewrecentFinal=[];  
  this.getDataRecent();
}

getDataRecent(){
  let loading=this.loadingCtrl.create({    
    spinner:'hide',
    content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
    cssClass:'transparent' 
  });
  Observable.of(loading).flatMap(loading=>loading.present()).flatMap(()=>this.service.RecentViewFetch()).subscribe(data=>{
    this.ViewList=data; 
    var arrayWithDuplicates=[];
    for(let i=0;i<this.ViewList.message.length;i++) {  
      arrayWithDuplicates.push({detailaddress:this.ViewList.message[i].detailaddress,lat:this.ViewList.message[i].location[0].lat,lng:this.ViewList.message[i].location[0].lng});
    }
    var uniqueArray = this.removeDuplicates(arrayWithDuplicates, "lat");
    for(let i=0;i<uniqueArray.length;i++) {  
      var tempview=[];
      tempview=this.RecentViewArr(this.namelist,uniqueArray[i].lat,uniqueArray[i].lng);
      this.ViewrecentFinal.push(tempview);  
      tempview=[];
    } 
    loading.dismiss();
  },err => {
    loading.dismiss();
    this.toastCtrl.create({  message: "No internet connection", duration: 4000, position: 'middle' }).present(); 
  }) 
}

CreateRateArr(arrnum){
  var arraytmp=[];
for(let i=0;i<arrnum;i++){
  arraytmp.push(i);
}
  return arraytmp;
}

 removeDuplicates(originalArray, prop) {
   var newArray = [];
   var lookupObject  = {};

   for(var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
   }

   for(i in lookupObject) {
       newArray.push(lookupObject[i]);
   }
    return newArray;
}
 
  RecentViewArr(namelist,destinylat,destinylng) {
    var uniqueArray = namelist.filter(function(item, pos, self) {   
    if(item.lat ==destinylat && item.lng == destinylng)  { 
      return item;   
      }  
    })
    return uniqueArray;
  }

  detaildiaper(destinylat,destinylng) {     
    var i=0;
    i=this.GetNameListIndex(this.namelist,destinylat,destinylng);    
    this.navCtrl.push(DetaildiaperPage,{id:i,place_data:this.namelist})
  }

  GetNameListIndex(namelist,destinylat,destinylng) {
    var IndexArr=-1;
    var uniqueArray = namelist.filter(function(item, pos, self) {   
      if(item.lat == destinylat && item.lng == destinylng)  { IndexArr=pos; return pos; }   
    })
      return IndexArr;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentviewPage');
  }

}
