import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ENV}from'../../app/env'
import{Http,Headers,RequestOptions}from'@angular/http'
import{Observable}from'rxjs/Rx'
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider'); 
  }

  ImageUrlLink(){  
    return "http://res.cloudinary.com/loginworks/image/upload/b_rgb:222d31,c_crop/b_rgb:222d31/";
  }

  Signup(signupdata,addchildata)
  {

    let param={
      
        'firstname':signupdata.controls["firstname"].value,
        'lastname':signupdata.controls["lastname"].value,
         'birth':signupdata.controls["birthdate"].value,
        'gender':signupdata.controls["Gender"].value,
        'mobile':signupdata.controls["mobile"].value,
        'email':signupdata.controls["mail"].value,
        'password':signupdata.controls["password"].value,
        'Children':addchildata
  
    };
   let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
   
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.post(ENV.mainApi+'/signup',param)
.map((data)=>{
  console.log('pikabu'+data)
  return data.json()

})
// let param={
//   "txtUsername": "artplatform4@mailinator.com",
//   "txtPassword": "testpasswd",
//   "txtConfirmPassword": "testpasswd",
//   "txtUsertype": 2
// }
// let  headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     headers.append('Accept', 'application/json');
   
//     let requestOptions=new RequestOptions({headers:headers})
// return this.http.post('https://www.demo.artformplatform.com/api/users/register.json',param)
// .map((data)=>{
//   console.log('pikabu'+data)
//   return data.json()

// })
  }
  login(email,password)
  {
    let param={
      
     
      'email':email,
      'password':password,
     

  };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
 
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/login',param)
.map((data)=>{
console.log('pikabu'+data)
return data.json()

})

  }

 

  forgetpassword(email)
  {
    let param={
   
      'email':email,
   
  };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
 
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/password_reset',param)
.map((data)=>{
console.log('pikabu'+data)
return data.json()

})
  }

  rating(type, change_table, hooks_in_change_room, childers_toilet, stroller_friendly, nursing, star_rating,array_img,detailaddress,location) { 
    let param={
      'type':type,
      'change_table':change_table,
      'hooks_in_change_room':hooks_in_change_room,
      'childers_toilet':childers_toilet,
      'stroller_friendly':stroller_friendly,
      'nursing':nursing,
      'star_rating':star_rating,
      'array_img':array_img,
      'detailaddress':detailaddress,  
      'location':location,
      'userid':localStorage.getItem('user_id'),
  };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/rating',param)
.map((data)=>{
console.log('rating='+data)
return data.json()
})
} 

fetch_rating() { 
let  headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
let requestOptions=new RequestOptions({headers:headers})
return this.http.get(ENV.mainApi+'/fetch_rating')
.map((data)=>{
console.log('fetch_rating='+data)
return data.json()
})
} 

RecentViewFetch() {     
let param={ 'userid':localStorage.getItem('user_id')  };
let  headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
let requestOptions=new RequestOptions({headers:headers})
return this.http.post(ENV.mainApi+'/recent_view_fetch',param)
//return this.http.post('http://localhost:3000/recent_view_fetch',param)
.map((data)=>{
console.log('rating='+data)
return data.json()
})
} 
 
UserDetailByID() {      
  let param={ 'userid':localStorage.getItem('user_id')  };
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/user_detailbyid',param)
  //return this.http.post('http://localhost:3000/user_detailbyid',param)
  .map((data)=>{
  console.log('rating='+data)
  return data.json()
  })
  } 


  UserDetailUpdateByID(firstname,lastname,birth,gender,mobile,email) {      
    let param={ 'userid':localStorage.getItem('user_id'),'firstname':firstname ,'lastname':lastname,'birth':birth,'gender':gender,'mobile':mobile,'email':email    };
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.post(ENV.mainApi+'/user_detailupdatebyid',param)
    //return this.http.post('http://localhost:3000/user_detailupdatebyid',param)
    .map((data)=>{
    console.log('rating='+data)
    return data.json()
    })
    } 

}
