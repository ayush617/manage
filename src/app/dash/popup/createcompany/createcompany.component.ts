import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.scss']
})
export class CreatecompanyComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,
              private common: CommonService,
              private toast: ToastrService) { }

  @Input() data;

  id;
  fname;
  lname;
  username;
  email;
  password;
  company;

  isEdit: Boolean = false;

  ngOnInit() {
    if(this.data){
      this.isEdit=true;
        this.id=this.data.id;
        this.fname=this.data.fname;
        this.lname=this.data.lname;
        this.username=this.data.username;
        this.email=this.data.email;
        this.password=this.data.password;
        this.company=this.data.company;
    }else{
      this.isEdit=false;
      this.id='';
      this.fname='';
      this.lname='';
      this.username='';
      this.email='';
      this.password='';
      this.company='';
    }
  }
  
  create(){
    let obj = {
      id:this.id,
      fname:this.fname,
      lname:this.lname,
      username:this.username,
      email:this.email,
      password:this.password,
      company:this.company
    }
    this.common.createCompany(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Company Created');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );
  }

  update(){
    let obj = {
      id:this.id,
      fname:this.fname,
      lname:this.lname,
      username:this.username,
      email:this.email,
      password:this.password,
      company:this.company
    }

    this.common.updateCompany(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Company Updated');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );

  }
}
