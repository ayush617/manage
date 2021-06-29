import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private http: HttpClient) { }

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
  this.http.post<any>('http://192.168.29.35/api/',{username: username, password: password}).subscribe({
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

}
