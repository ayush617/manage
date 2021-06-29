import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private common: CommonService,
              private toast: ToastrService) { }

  username;
  password;

  ngOnInit() {
  }

  submit(){
    // console.log(this.username)
    // console.log(this.password)
    if(!this.username){
      this.toast.error('Please enter username');
      return
    }
    if(!this.password){
      this.toast.error('Please enter password');
      return
    }
    this.common.login(this.username,this.password);
  }

}
