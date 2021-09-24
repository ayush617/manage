import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,
              private common: CommonService,
              private toast: ToastrService) { }

  @Input() data;
  @Input() count;

  id;
  email;
  phoneno;
  details;
  username;
  editid;
  fname;
  lname;
  password;
  phone;

  name;
  
  progress;
  isEdit: Boolean = false;

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.isEdit=true;
      this.id=this.data.empid;
      this.username=this.data.username;
      this.fname=this.data.fname;
      this.lname=this.data.lname;
      this.email=this.data.email;
      this.password=this.data.password;
      this.phone=this.data.phone;
    }else{
      this.isEdit=false;
      this.id='';
      this.name='';
      this.email='';
      this.phoneno='';
      this.details='';
    }
  }
  
  create(){
    let obj = {
      empid:this.id?this.id:localStorage.getItem('companyName')+' '+(this.count+1),
      username:this.username,
      fname:this.fname,
      lname:this.lname,
      email:this.email,
      password:this.password,
      phone:this.phone,
      company:localStorage.getItem('company')
    }
    this.common.createUser(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('User Created');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );
  }

  update(){
    let obj = {
      id:this.data.id,
      empid:this.id,
      username:this.username,
      fname:this.fname,
      lname:this.lname,
      email:this.email,
      password:this.password,
      phone:this.phone,
      company:localStorage.getItem('company')
    }

    this.common.updateUser(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('User Updated');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );

  }

}
