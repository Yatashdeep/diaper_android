import { Component ,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { ReviewratePage } from '../reviewrate/reviewrate';
import { Geolocation } from '@ionic-native/geolocation';
import { ReviewsummaryPage } from '../reviewsummary/reviewsummary';
import{ServiceProvider}from'../../providers/service/service';
import{Observable}from'rxjs/Rx'
import{ENV}from'../../app/env'
import{Http,Headers,RequestOptions}from'@angular/http'

declare var google
/**
 * Generated class for the DetaildiaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detaildiaper',
  templateUrl: 'detaildiaper.html',
})
export class DetaildiaperPage { 
  @ViewChild('map') mapElement:ElementRef;
  child=['assets/imgs/thumbnail.png','assets/imgs/thumbnail.png','assets/imgs/thumbnail.png']
 map:any
 place_data
 index
 name
 detailaddress 
 type
 openinghours
 distance
 rating
 totalrating
 photos
 destinylat
 destinylng

 starRatingDiaper:any=0.00;
 total_reviews:number=0;
 starPattern:any=[];
 ReviewStarArray=[]; 
 ShowingRate:boolean =false;     
 constructor(public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider,public loadingCtrl:LoadingController,public http: Http) {
  
  //let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'});
  
  this.starPattern=[];
  this.ReviewStarArray=[];
  this.place_data=[];
/*
  this.place_data.push({  address: "Noida",
  detailaddress: "Noida",
  distance: 1,
  lat: 28.5355161,
  lng: 77.39102649999995,
  market: "Not given",
  photos: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAenxgtSb9iFcmM801eJV-Fui-jGFkp5C27U_CN0WqIGI6Sp4POw-yf6yK6Sz0ReD8WFE15aojIKn_eklbwpF6aSexrKus1P_7oNmAxvIHfiOAX320Rj4FVGb7zxpIxnRXEhByENBgMq1t78j3tnFUDqzIGhSEHIch3_b9y427_ffd9MfvKyP8Dw&3u400&4u400&5m1&2e1&callback=none&key=AIzaSyAnnrs3LJlEkOP9hLnQ8_k2CBSAJ8--kZs&token=96216",
  rating: "Not given",
  totalrate: "0",    
  type: "locality/political" });
  this.index=0; 
*/
  this.place_data=this.navParams.get('place_data')
  this.index=this.navParams.get('id')

  console.log('place_data',this.place_data)
  console.log('id',this.index)

  this.name=this.place_data[this.index].address
  this.detailaddress=this.place_data[this.index].detailaddress
  this.type=this.place_data[this.index].type
  this.openinghours=this.place_data[this.index].market
  this.distance=this.place_data[this.index].distance
  this.rating=this.place_data[this.index].rating
  this.totalrating=this.place_data[this.index].totalrate
  this.photos=this.place_data[this.index].photos
  this.destinylat=this.place_data[this.index].lat
  this.destinylng=this.place_data[this.index].lng

  console.log('lng',this.destinylng,"= this.rating=", this.rating);
  console.log('lat',this.destinylat);

  let headers = new Headers({ 'Content-Type':'application/json' });
  let requestOptions=new RequestOptions({ headers:headers });  
  var locationTmp=[];
  locationTmp.push({lat:this.place_data[this.index].lat,lng:this.place_data[this.index].lng}); 
  let param=JSON.stringify({ detailaddress:localStorage.getItem('user_id'),location:locationTmp });  
  this.http.post(ENV.mainApi+'/recent_view',param,requestOptions).subscribe(res => {  
    //this.http.post('http://localhost:3000/recent_view',param,requestOptions).subscribe(res => { 
      console.log(JSON.parse((<any>res)._body));
      locationTmp=[];
    },err =>{ console.log("err==",err);   locationTmp=[]; }); 

  this.GetDetail(this.destinylat,this.destinylng);    

  }

  ionViewDidLoad() {
    // var map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 10,
    //   center: new google.maps.LatLng('31.633980', '74.872261'),
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // });
    
    // var infowindow = new google.maps.InfoWindow();
    
    // var marker, i;
    
    
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng('31.633980','74.872261'),
    //     map: map
    //   });
    
    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //     return function() {
    //       infowindow.setContent('green park');
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i));
 
    this.geolocation.getCurrentPosition().then((position)=>{
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: position.coords.latitude, lng:position.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 7,
        center: {lat:position.coords.latitude , lng: position.coords.longitude}
      });
      directionsDisplay.setMap(map);
   
      directionsService.route({
        origin: {lat:position.coords.latitude, lng: position.coords.longitude},
        destination: {lat:this.destinylat, lng:this.destinylng },
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    })
 

 
  }

  ratetap()
  {
    this.navCtrl.push(ReviewsummaryPage,{ReviewStarArray:this.ReviewStarArray})   
  }
  review(){
    this.navCtrl.push(ReviewratePage,{place_data:this.place_data,destinylng:this.destinylng,destinylat:this.destinylat,index:this.index});
  }

  GetDetail(destinylat,destinylng) { 

    this.ShowingRate=false;

    let loading=this.loadingCtrl.create({    
      spinner:'hide',
      content:'<img src="https://media.giphy.com/media/27qN9QiKZTbQldwCvt/giphy.gif" style="height:100px!important">',
      cssClass:'transparent' 
    });
 
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(()=>this.service.fetch_rating()).subscribe(data=>{
      var sum_of_rating=0;
        this.ReviewStarArray = data.message.filter(function(item, pos, self) {  
          if(item.location[0].lat ==destinylat && item.location[0].lng == destinylng)  {  
             sum_of_rating=sum_of_rating+parseInt(item.star_rating);  
            return item;   
           }  
        })
        console.log("sum_of_rating=",sum_of_rating);
        var total_users_rated= this.ReviewStarArray.length;    
        var sum_of_max_rating_of_user_count= total_users_rated * 5; 
        this.starRatingDiaper=((sum_of_rating * 5) / sum_of_max_rating_of_user_count).toFixed(1); 
       // this.total_reviews= (sum_of_rating/5*5)*5;
       this.total_reviews= total_users_rated;
       for(let i=0;i<parseInt(this.starRatingDiaper);i++) { this.starPattern.push(i); }
        this.ShowingRate=true;
      loading.dismiss();
    },err => {
      this.ShowingRate=false;
      loading.dismiss();
      console.log("err==",err);
    }) 


  }


}
