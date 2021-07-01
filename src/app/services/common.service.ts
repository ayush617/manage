import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private http: HttpClient,
            private router: Router) { }

check(){
  this.http.get<any>('http://192.168.29.35/api/').subscribe({
    next: data => {
      console.log(data);
        // this.postId = data.id;
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
}

login(username='',password=''){
  let body = 'username='+username+'&password='+password;
  this.http.post<any>('http://192.168.29.35/api/',body,{headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).subscribe({
    next: data => {
      // console.log(data);
      // localStorage.setItem
      if(data.status==='Success'){
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('username', data.data.username);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('fname', data.data.fname);
        localStorage.setItem('lname', data.data.lname);
        this.router.navigate(["/"])
      }else{
        localStorage.clear();
      }
        // this.postId = data.id;
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
}

logout(){
  localStorage.clear();
  this.router.navigate(["/login"])
}

}
