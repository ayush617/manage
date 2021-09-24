import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CreatecompanyComponent } from '../../popup/createcompany/createcompany.component';
import { CreateleadComponent } from '../../popup/createlead/createlead.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  displayedColumns = ['sn', 'leadid', 'name', 'email', 'phoneno', 'status', 'progress' ,'assignedto', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private common:CommonService,
              private modal:NgbModal,
              private toast: ToastrService) {

  }

  data ;
  select=0;

  completed;
  new;
  progress;
  users;


  ngOnInit() {
    let company = localStorage.getItem('company');
    this.common.getLeads({company:company}).then(
      res=>{
        let tmp = res['data'];
        this.dataSource = new MatTableDataSource(tmp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    const creatPopupLead = this.modal.open(CreateleadComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopupLead.componentInstance.count = this.dataSource.data.length;
    creatPopupLead.result.then((res)=>{
      // console.log(res)
      if(res){
        this.ngOnInit()
      }
    })
  }

  edit(data){
    const creatPopup = this.modal.open(CreateleadComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopup.componentInstance.data = data;
    creatPopup.result.then((res)=>{
      if(res){
        this.ngOnInit()
      }
    })
  }

  update(type,data,id){
    let obj = {id:Number(id)};
    let msg;
    if(type=='status'){
      obj = {...obj, ...{status:data}};
      msg = 'Status Updated';
    }
    if(type=='delete'){
      obj = {...obj, ...{status:data}};
      msg = 'User Deleted';
    }
    if(type=='assignedto'){
      obj = {...obj, ...{assignedto:Number(data)}};
      msg = 'Lead Assigned';
    }
    this.common.updateLeads(obj).then(
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