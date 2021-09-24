import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent implements OnInit {

 constructor(private activeModal: NgbActiveModal,
              private common: CommonService,
              private toast: ToastrService) { }

  @Input() data;
  @Input() count;
  id;
  name;
  details;
  editid;
  progress;

  isEdit: Boolean = false;

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.isEdit=true;
        this.id=this.data.taskid;
        this.name=this.data.name;
        this.details=this.data.data;
        this.progress=this.data.progress;
    }else{
      this.isEdit=false;
      this.id='';
      this.name='';
      this.details='';
    }
  }
  
  create(){
    let obj = {
      taskid:this.id?this.id:localStorage.getItem('companyName')+' '+(this.count+1),
      name:this.name,
      details:this.details,
      company:localStorage.getItem('company')
    }
    this.common.createTask(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Task Created');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );
  }

  update(){
    let obj = {
      editid:true,
      taskid:this.id,
      id:this.data.id,
      name:this.name,
      details:this.details,
      progress:this.progress
    }

    this.common.updateTask(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.activeModal.close(obj);
          this.toast.success('Task Updated');
        }else{
          this.activeModal.close();
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );

  }

}
