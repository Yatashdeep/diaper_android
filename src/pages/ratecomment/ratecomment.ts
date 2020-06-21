import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ServiceProvider}from'../../providers/service/service';

/**
 * Generated class for the RatecommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ratecomment',
  templateUrl: 'ratecomment.html',
})
export class RatecommentPage {
  child=[1,2,3];
  ReviewStarArray
  index

  change_table
  childers_toilet
  hooks_in_change_room
  nursing
  star_rating
  stroller_friendly

  WashRoomtypeMen
  WashRoomtypeWomen
  WashRoomtypeNeutral
  WashRoomtypeChild

  array_img

  ImageUrl
  FullName
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider) {
    this.ReviewStarArray=this.navParams.get("ReviewStarArray");
    this.index=this.navParams.get("index");
console.log("this.ReviewStarArray[this.index]=",this.ReviewStarArray[this.index]); 
    this.change_table=this.ReviewStarArray[this.index].change_table;  
    this.childers_toilet=this.ReviewStarArray[this.index].childers_toilet;
    this.hooks_in_change_room=this.ReviewStarArray[this.index].hooks_in_change_room;
    this.nursing=this.ReviewStarArray[this.index].nursing;
    this.star_rating=this.ReviewStarArray[this.index].star_rating;
    this.stroller_friendly=this.ReviewStarArray[this.index].stroller_friendly;

    this.WashRoomtypeMen=this.ReviewStarArray[this.index].type[0].men;
    this.WashRoomtypeWomen=this.ReviewStarArray[this.index].type[0].woman;
    this.WashRoomtypeNeutral=this.ReviewStarArray[this.index].type[0].neutral;
    this.WashRoomtypeChild=this.ReviewStarArray[this.index].type[0].children;
    this.FullName=this.ReviewStarArray[this.index].userid.firstname
    
    this.array_img=this.ReviewStarArray[this.index].array_img;
    this.ImageUrlLink();  
  }

  ImageUrlLink() {    this.ImageUrl=this.service.ImageUrlLink();   }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad RatecommentPage'); 
  }

}
