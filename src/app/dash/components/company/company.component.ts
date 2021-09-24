import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { CreatecompanyComponent } from '../../popup/createcompany/createcompany.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  displayedColumns = ['id', 'fname', 'username', 'email', 'company', 'status' , 'actions'];
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
    this.common.getCompany().then(
      res=>{
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
    const creatPopup = this.modal.open(CreatecompanyComponent,{size:'sm',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
    creatPopup.result.then((res)=>{
      if(res){
        this.ngOnInit()
      }
    })
  }

  update(key,value,id){
    let obj = {id:id};
    let msg;
    if(key=='status'){
      obj = {...obj, ...{status:value?1:0}};
      msg = 'Status Updated';
    }
    this.common.updateCompany(obj).then(
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

  deleteIt(id,i){
    let obj = {id:id,status:-1};
    this.common.updateCompany(obj).then(
      res=>{
        if(res['status']==='Success'){
          this.toast.success('Record Deleted');
          // this.dataSource.data.splice(i, 1);
          this.ngOnInit();
        }else{
          this.toast.error('Error! Contact Tec Team');
        }
      }
    );
  }

  edit(data){
    const creatPopup = this.modal.open(CreatecompanyComponent,{size:'sm',centered: true, windowClass:'popup', backdrop:false, backdropClass: 'black-backdrop'});
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
