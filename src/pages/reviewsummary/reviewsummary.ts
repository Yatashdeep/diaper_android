import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RatecommentPage } from '../ratecomment/ratecomment';

/**
 * Generated class for the ReviewsummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviewsummary',
  templateUrl: 'reviewsummary.html',
})
export class ReviewsummaryPage {

  ReviewStarArray
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ReviewStarArray=this.navParams.get("ReviewStarArray");
    console.log("ReviewStarArray==",this.ReviewStarArray); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsummaryPage');
  }
   
  usertap(index){ 
    this.navCtrl.push(RatecommentPage,{ReviewStarArray:this.ReviewStarArray,index:index}); 
  }

}
