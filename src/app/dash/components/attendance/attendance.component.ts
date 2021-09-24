import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  constructor() { }
  viewDate={date:new Date('2016-01-05')};
  events;
  ngOnInit() {
  }

}
