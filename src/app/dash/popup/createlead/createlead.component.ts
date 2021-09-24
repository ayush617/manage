import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-createlead',
  templateUrl: './createlead.component.html',
  styleUrls: ['./createlead.component.scss']
})
export class CreateleadComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,
              private common: CommonService,
              private toast: ToastrService) { }

  @Input() data;
  @Input() count;
  id;
  name;
  email;
  phoneno;
  details;

  editid;

  progress;

  isEdit: Boolean = false;

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.isEdit=true;
      this.editid=this.data.id;
        this.id=this.data.leadid;
        this.name=this.data.name;
        this.email=this.data.email;
        this.phoneno=this.data.phone;
        this.details=this.data.details;
        this.progress=this.data.progress;
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
      id:this.id?this.id:localStorage.getItem('companyName')+' '+(this.count+1),
      name:this.name,
      email:this.email,
      phoneno:this.phoneno,
      details:this.details,
      company:localStorage.getItem('company')
    }
    this.common.createLeads(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Lead Created');
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
      editid:Number(this.editid),
      name:this.name,
      email:this.email,
      phoneno:this.phoneno,
      details:this.details,
      progress:Number(this.progress)
    }

    this.common.updateLeads(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Lead Updated');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );

  }

}
