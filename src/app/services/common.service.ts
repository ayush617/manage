import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private http: HttpClient,
            private router: Router,
            private toast: ToastrService) { }

companyData;

check(){
  this.http.get<any>('https://proficient-chinook-3741.dataplicity.io/api/').subscribe({
    next: data => {
      // console.log(data);
        // this.postId = data.id;
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
}

login(username='',password='',type=''){
  let body = 'username='+username+'&password='+password+'&type='+type;
  this.http.post<any>('https://proficient-chinook-3741.dataplicity.io/api/',body,{headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).subscribe({
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
        localStorage.setItem('company', data.data.company);
        localStorage.setItem('companyName', data.data.companyName);
        localStorage.setItem('roles', JSON.stringify(data.data.role));
        this.router.navigate(["/"])
      }else{
        localStorage.clear();
        this.toast.error(data.status)
      }
        // this.postId = data.id;
    },
    error: error => {
        // this.errorMessage = error.message;
        // console.error('There was an error!', error);
    }
  })
}

logout(){
  localStorage.clear();
  this.router.navigate(["/login"])
}

getCompany(){
 return new Promise((resolve,reject)=>{
  this.http.get<any>('https://proficient-chinook-3741.dataplicity.io/api/company/').subscribe(
    res=>{resolve(res)},
    err=>{reject(err)}
  )});
}

createCompany(data){
  return new Promise((resolve,reject)=>{
    this.http.post<any>('https://proficient-chinook-3741.dataplicity.io/api/company/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

updateCompany(data){
  return new Promise((resolve,reject)=>{
    this.http.put<any>('https://proficient-chinook-3741.dataplicity.io/api/company/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

getUser(data){
  return new Promise((resolve,reject)=>{
    this.http.get<any>('https://proficient-chinook-3741.dataplicity.io/api/users/?company='+data.company).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
 }

 createUser(data){
  return new Promise((resolve,reject)=>{
    this.http.post<any>('https://proficient-chinook-3741.dataplicity.io/api/users/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

updateUser(data){
  return new Promise((resolve,reject)=>{
    this.http.put<any>('https://proficient-chinook-3741.dataplicity.io/api/users/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

 getLeads(data){
  return new Promise((resolve,reject)=>{
    this.http.get<any>('https://proficient-chinook-3741.dataplicity.io/api/leads/?company='+data.company).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
 }

 createLeads(data){
  return new Promise((resolve,reject)=>{
    this.http.post<any>('https://proficient-chinook-3741.dataplicity.io/api/leads/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

updateLeads(data){
  return new Promise((resolve,reject)=>{
    this.http.put<any>('https://proficient-chinook-3741.dataplicity.io/api/leads/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

getTask(data){
  return new Promise((resolve,reject)=>{
    this.http.get<any>('https://proficient-chinook-3741.dataplicity.io/api/tasks/?company='+data.company).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
 }

 createTask(data){
  return new Promise((resolve,reject)=>{
    this.http.post<any>('https://proficient-chinook-3741.dataplicity.io/api/tasks/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

updateTask(data){
  return new Promise((resolve,reject)=>{
    this.http.put<any>('https://proficient-chinook-3741.dataplicity.io/api/tasks/',data).subscribe(
      res=>{resolve(res)},
      err=>{reject(err)}
    )});
}

}
