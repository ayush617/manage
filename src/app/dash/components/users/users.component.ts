import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CreatecompanyComponent } from '../../popup/createcompany/createcompany.component';
import { CreateuserComponent } from '../../popup/createuser/createuser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['sn', 'empid', 'fname', 'username', 'email', 'company', 'status' , 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private common:CommonService,
              private modal:NgbModal,
              private toast: ToastrService) {

  }

  users: UserData[] = [];
  data ;
  id;
  ngOnInit() {
    this.id = localStorage.getItem('id');
    let company = localStorage.getItem('company');
    this.common.getUser({company:company}).then(
      res=>{
        console.log(res)
        let tmp = res['data'];
        this.dataSource = new MatTableDataSource(tmp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource)
      }
    );
    // this.users = [...this.common.companyData];
    // for (let i = 1; i <= 100; i++) { this.users.push(createNewUser(i)); }
    // this.dataSource = new MatTableDataSource(this.users);
    // Assign the data to the data source for the table to render
    
    // console.log(this.dataSource)
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
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
    const creatPopup = this.modal.open(CreateuserComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopup.componentInstance.count = this.dataSource.data.length;
    creatPopup.result.then((res)=>{
      console.log(res)
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
      msg = 'User Deleted';
    }
    if(type=='undo'){
      obj = {...obj, ...{status:data}};
      msg = 'User Reverted';
    }
    this.common.updateUser(obj).then(
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

  edit(data){
    const creatPopup = this.modal.open(CreateuserComponent,{size:'lg',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopup.componentInstance.data = data;
    creatPopup.result.then((res)=>{
      if(res){
        this.ngOnInit()
      }
    })
  }
}

export interface UserData {
  id: string;
  fname: string;
  username: string;
  email: string;
  company: string;
}
