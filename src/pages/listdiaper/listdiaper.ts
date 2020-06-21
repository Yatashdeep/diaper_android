import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetaildiaperPage } from '../detaildiaper/detaildiaper';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
/**
 * Generated class for the ListdiaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-listdiaper',
  templateUrl: 'listdiaper.html',
})
export class ListdiaperPage {
  text: string;

  users: any;
  fakeUsers: Array<any> = new Array(5);
  rating: number = 2;
  resultplace=0
  imagebox=[1,2,3,4,5,6,7,8]
  @ViewChild('map') mapElement:ElementRef;
  map: any;
  infowindow: any;
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  namelist=[]
  placeimage
  market
  placetype
  distance
  placerate
  totalrating
  namelist1=[]
  namelist2=[]
  namelist3=[]
  mile
  PermanentArray=[]
  PermanentArray1=[]
  PermanentArray2=[]
  PermanentArray3=[]
  constructor(public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    this.mile='genric'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListdiaperPage');
  //  setTimeout(()=>{
  //   this.initdetail()
  //  },3000)
  // this.initdetail()
  }

  ionViewWillEnter() { 
    this.initdetail()
  }

  detaildiaper(i){
    console.log("index listdiaper==",i); 
 this.navCtrl.push(DetaildiaperPage,{id:i,place_data:this.namelist})
  }

  detaildiaper1(i){
    this.navCtrl.push(DetaildiaperPage,{id:i,place_data:this.namelist1})
     }
     detaildiaper2(i){
 
 
      this.navCtrl.push(DetaildiaperPage,{id:i,place_data:this.namelist2})
       }
       detaildiaper3(i){
 
 
        this.navCtrl.push(DetaildiaperPage,{id:i,place_data:this.namelist3})
         }

         logout() {
           localStorage.clear();
          this.navCtrl.push(HomePage) 
         }
          
initdetail() { 

this.geolocation.getCurrentPosition().then((position)=>{

  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    center: {lat: position.coords.latitude, lng:position.coords.longitude},
    zoom: 15
  });
  var service = new google.maps.places.PlacesService(this.map);
  service.nearbySearch({
    location: {lat:position.coords.latitude,lng: position.coords.longitude},
    radius: 5000,
    type: ['store',
    'bus_station',
    'church',
    'city_hall',
    'clothing_store',
    'convenience_store',
    'gas_station',
    'gym',
    'hindu_temple',
    'hospital',
    'mosque',
    'movie_theater',
    'restaurant',
    'shopping_mall',
    'subway_station',
    'supermarket',
    'taxi_stand',
    'train_station'
  
  
  ]
  }, (results,status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
     
      var photoUrl = results[0].photos[0].getUrl({maxWidth: 400, maxHeight: 400});
    
     
      for (var i = 0; i < results.length; i++) {
        this.createdatlist(results[i],results.length,position.coords.latitude,position.coords.longitude);
      }
    }
  });


})



  }
  createdatlist(place,reslen,lat,lng)
  {
   

var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(place.geometry.location.lat()-lat);  // deg2rad below
  var dLon = this.deg2rad(place.geometry.location.lng()-lng); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(place.geometry.location.lat())) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
 var d = R * c; // Distance in km
  this.distance=Math.round(d)
  

if(place.rating)
{
  this.placerate=place.rating
   this.totalrating=place.user_ratings_total
    if(place.opening_hours)
    {
    if(place.photos)
    {
     this.placeimage=place.photos[0].getUrl({maxWidth: 400, maxHeight: 400})
      if(place.opening_hours.open_now==true)
      {
          this.market='open'
      } 
      else{
           this.market='close'
      }
      this.placetype=place.types.join('/');
   
     this.namelist.push({'market':this.market,
     'address':place.name,
     'photos':this.placeimage,
     'detailaddress':place.vicinity,
     'type':this.placetype,
     'distance':this.distance,
     'rating':this.placerate,
     'totalrate':this.totalrating,
     'lat':place.geometry.location.lat()
     ,'lng':place.geometry.location.lng()})
   
    }
    else{
      if(place.opening_hours.open_now==true)
      {
          this.market='open'
      } 
      else{
           this.market='close'
      }
      this.placetype=place.types.join('/');
   
      this.placeimage='assets/imgs/thumbnail.png'
      this.namelist.push({'market':this.market,
      'address':place.name,
      'photos':this.placeimage,
      'detailaddress':place.vicinity,
      'type':this.placetype,
      'distance':this.distance,
      'rating':this.placerate,
      'totalrate':this.totalrating,
      'lat':place.geometry.location.lat()
      ,'lng':place.geometry.location.lng()})
    }
  }
  else
  {
    if(place.photos)
    {
     this.placeimage=place.photos[0].getUrl({maxWidth: 400, maxHeight: 400})
     this.placetype=place.types.join('/');
     console.log(this.placetype)
     this.namelist.push({'market':'Not given',
     'address':place.name,
     'photos':this.placeimage,
     'detailaddress':place.vicinity,
     'type':this.placetype,
     'distance':this.distance,
     'rating':this.placerate,
     'totalrate':this.totalrating,
     'lat':place.geometry.location.lat()
     ,'lng':place.geometry.location.lng()})
   
    }
    else{
     
      this.placetype=place.types.join('/');
     
      this.placeimage='assets/imgs/thumbnail.png'
      this.namelist.push({'market':'Not given',
      'address':place.name,
      'photos':this.placeimage,
      'detailaddress':place.vicinity,
      'type':this.placetype,
      'distance':this.distance,
      'rating':this.placerate,
      'totalrate':this.totalrating,
      'lat':place.geometry.location.lat()
      ,'lng':place.geometry.location.lng()})
    }
  }
}
else{
  this.placerate='Not given'
  this.totalrating='0'
  if(place.opening_hours)
  {
  if(place.photos)
  {
   this.placeimage=place.photos[0].getUrl({maxWidth: 400, maxHeight: 400})
    if(place.opening_hours.open_now==true)
    {
        this.market='open'
    } 
    else{
         this.market='close'
    }
    this.placetype=place.types.join('/');
 
   this.namelist.push({'market':this.market,
   'address':place.name,
   'photos':this.placeimage,
   'detailaddress':place.vicinity,
   'type':this.placetype,
   'distance':this.distance,
   'rating':this.placerate,
   'totalrate':this.totalrating,
   'lat':place.geometry.location.lat()
   ,'lng':place.geometry.location.lng()})
 
  }
  else{
    if(place.opening_hours.open_now==true)
    {
        this.market='open'
    } 
    else{
         this.market='close'
    }
    this.placetype=place.types.join('/');
   
    this.placeimage='assets/imgs/thumbnail.png'
    this.namelist.push({'market':this.market,
    'address':place.name,
    'photos':this.placeimage,
    'detailaddress':place.vicinity,
    'type':this.placetype,
    'distance':this.distance,
    'rating':this.placerate,
    'totalrate':this.totalrating,
    'lat':place.geometry.location.lat()
    ,'lng':place.geometry.location.lng()})
  }
}
else
{
  if(place.photos)
  {
   this.placeimage=place.photos[0].getUrl({maxWidth: 400, maxHeight: 400})
   this.placetype=place.types.join('/');

   this.namelist.push({'market':'Not given',
   'address':place.name,
   'photos':this.placeimage,
   'detailaddress':place.vicinity,
   'type':this.placetype,
   'distance':this.distance,
   'rating':this.placerate,
   'totalrate':this.totalrating,
   'lat':place.geometry.location.lat()
   ,'lng':place.geometry.location.lng()})
 
  }
  else{
   
    this.placetype=place.types.join('/');
 
    this.placeimage='assets/imgs/thumbnail.png'
    this.namelist.push({'market':'Not given',
    'address':place.name,
    'photos':this.placeimage,
    'detailaddress':place.vicinity,
    'type':this.placetype,
    'distance':this.distance,
    'rating':this.placerate,
    'totalrate':this.totalrating,
    'lat':place.geometry.location.lat()
    ,'lng':place.geometry.location.lng()})
  }
}



this.PermanentArray=this.namelist
localStorage.setItem('namelist', JSON.stringify(this.namelist));   
}

    this.resultplace=reslen

    
  }
  onSelectChange(selectedValue: any) {

    if(selectedValue=='onemile')
    { 
      this.mile='onem'
      this.namelist3=[]
      this.namelist2=[]
      for(var i=0;i<this.namelist.length;i++)
      {
           if(this.namelist[i].distance<=1)
           {
             
             this.namelist1.push({
              'market':this.namelist[i].market,
              'address':this.namelist[i].address,
              'photos':this.namelist[i].photos,
              'detailaddress':this.namelist[i].detailaddress,
              'type':this.namelist[i].type,
              'distance':this.namelist[i].distance,
              'rating':this.namelist[i].rating,
              'totalrate':this.namelist[i].totalrate,
              'lat':this.namelist[i].lat,
              'lng':this.namelist[i].lng
             })
            
           
            } 
                
      }



this.PermanentArray1=this.namelist1
this.resultplace=this.namelist1.length
      
    }

  else if(selectedValue=='fivemile')
  {
    this.mile='twom'
    this.namelist3=[]
    this.namelist1=[]
    for(var i=0;i<this.namelist.length;i++)
    {
         if(this.namelist[i].distance<=5)
         {
         
           this.namelist2.push({
            'market':this.namelist[i].market,
            'address':this.namelist[i].address,
            'photos':this.namelist[i].photos,
            'detailaddress':this.namelist[i].detailaddress,
            'type':this.namelist[i].type,
            'distance':this.namelist[i].distance,
            'rating':this.namelist[i].rating,
            'totalrate':this.namelist[i].totalrate,
            'lat':this.namelist[i].lat,
            'lng':this.namelist[i].lng
           })
       
         
         } 
              
    }
    this.PermanentArray2=this.namelist2
    this.resultplace=this.namelist2.length

  }
  else{
    this.mile='threem'
    this.namelist2=[]
    this.namelist1=[]
    for(var i=0;i<this.namelist.length;i++)
    {
         if(this.namelist[i].distance<=10)
         {
          
           this.namelist3.push({
            'market':this.namelist[i].market,
            'address':this.namelist[i].address,
            'photos':this.namelist[i].photos,
            'detailaddress':this.namelist[i].detailaddress,
            'type':this.namelist[i].type,
            'distance':this.namelist[i].distance,
            'rating':this.namelist[i].rating,
            'totalrate':this.namelist[i].totalrate,
            'lat':this.namelist[i].lat,
            'lng':this.namelist[i].lng
           })
      
          
         } 
              
    }

    this.PermanentArray3=this.namelist3
    this.resultplace=this.namelist3.length

  }

   
  



  }
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  filterItems(ev: any) {
    let val = ev.target.value;
if(this.mile=='genric')
{
    if (val && val.trim() !== '') {
      this.namelist = this.namelist.filter(function(item) {
        return item.address.toLowerCase().includes(val.toLowerCase());
      });
    }
   else if(ev.target.value =="" || ev.target.value ==undefined) {    
      this.namelist=this.PermanentArray;    
    } 
  }
  else if(this.mile='onem'){

    if (val && val.trim() !== '') {
      this.namelist1 = this.namelist.filter(function(item) {
        return item.address.toLowerCase().includes(val.toLowerCase());
      });
    }
   else if(ev.target.value =="" || ev.target.value ==undefined) {    
      this.namelist1=this.PermanentArray1;    
    } 



  }
  else if(this.mile='threem'){

    if (val && val.trim() !== '') {
      this.namelist2 = this.namelist.filter(function(item) {
        return item.address.toLowerCase().includes(val.toLowerCase());
      });
    }
   else if(ev.target.value =="" || ev.target.value ==undefined) {    
      this.namelist2=this.PermanentArray2;    
    } 



  }
  else if(this.mile='onemile'){

    if (val && val.trim() !== '') {
      this.namelist3 = this.namelist.filter(function(item) {
        return item.address.toLowerCase().includes(val.toLowerCase());
      });
    }
   else if(ev.target.value =="" || ev.target.value ==undefined) {    
      this.namelist3=this.PermanentArray3;    
    } 


 
  }
  }
 

}
