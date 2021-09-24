import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CreatetaskComponent } from '../../popup/createtask/createtask.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns = ['sn', 'taskid', 'name', 'status', 'progress' , 'user', 'assignedto', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private common:CommonService,
              private modal:NgbModal,
              private toast: ToastrService) {

  }

  users;
  data ;
  select=0;

  completed;
  new;
  progress

  ngOnInit() {
    let company = localStorage.getItem('company');
    this.common.getTask({company:company}).then(
      res=>{
        let tmp = res['data'];
        this.dataSource = new MatTableDataSource(tmp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource.data)
        this.completed = this.dataSource.data.filter(item => item['status'] == '5').length;
        this.new = this.dataSource.data.filter(item => item['status'] == '1').length;
        this.progress = this.dataSource.data.filter(item => item['status'] == '2').length;
      }
    );
    this.common.getUser({company:company}).then(
      res=>{
        this.users = res['data'];
      }
    );
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  create(){
    const creatPopupLead = this.modal.open(CreatetaskComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopupLead.componentInstance.count = this.dataSource.data.length;
    creatPopupLead.result.then((res)=>{
      // console.log(res)
      if(res){
        this.ngOnInit()
      }
    })
  }

  edit(data){
    const creatPopup = this.modal.open(CreatetaskComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopup.componentInstance.data = data;
    creatPopup.result.then((res)=>{
      if(res){
        this.ngOnInit()
      }
    })
  }

  update(type,data,id){
    let obj = {id:id};
    let msg;
    if(type=='status'){
      obj = {...obj, ...{status:data}};
      msg = 'Status Updated';
    }
    if(type=='delete'){
      obj = {...obj, ...{status:data}};
      msg = 'Task Deleted';
    }
    if(type=='assignedto'){
      obj = {...obj, ...{assignedto:Number(data)}};
      msg = 'Lead Assigned';
    }
    this.common.updateTask(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.toast.success(msg);
          this.ngOnInit();
        }else{
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );
  }
}

export interface UserData {
  id: string;
  fname: string;
  username: string;
  email: string;
  company: string;
}

