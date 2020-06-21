import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;
/**
 * Generated class for the NotificationpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationpage',
  templateUrl: 'notificationpage.html',
})
export class NotificationpagePage {
  @ViewChild('map') mapElement:ElementRef;
  map: any;
  infowindow: any;
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  namelist=[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    // setTimeout(()=>{
    //   this.notificationpage()
    // },3000)
   

    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;
    // var map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 7,
    //   center: {lat: 41.85, lng: -87.65}
    // });
    // directionsDisplay.setMap(map);
 
    // directionsService.route({
    //   origin: {lat: 31.633980, lng: 74.872261},
    //   destination: {lat: 32.134790, lng:76.375410 },
    //   travelMode: 'DRIVING'
    // }, function(response, status) {
    //   if (status === 'OK') {
    //     directionsDisplay.setDirections(response);
    //   } else {
    //     window.alert('Directions request failed due to ' + status);
    //   }
    // });
 
}
  notificationpage() {
   

   this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: -34.9290, lng:138.6010},
        zoom: 15
      });
  
  this.infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: {lat: -34.9290,lng: 138.6010},
        radius: 1000,
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
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      });
    
  }
  createMarker(place) {
 
    this.namelist.push(place.name)
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.mapElement, this);
    });
    
  }

}
