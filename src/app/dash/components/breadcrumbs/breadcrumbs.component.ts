import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  constructor() { }

  @Input() name;

  ngOnInit() {
    
  }

  ngOnChanges() {
    let tmp = this.name;
    tmp = tmp.slice(1);
    let tmp1 = tmp[0];
    tmp = tmp.slice(1);
    tmp1 = tmp1.toUpperCase() 
    this.name = tmp1+tmp;
    
  }

}
