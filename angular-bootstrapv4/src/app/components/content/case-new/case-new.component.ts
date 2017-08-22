import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'case-new-component',
  templateUrl: 'case-new.component.html',
  styleUrls: ['./case-new.component.scss']
})

export class CaseNewComponent implements OnInit {

  dateToday: Date;

  constructor() {
    this.dateToday = new Date();
    this.dateToday.setTime(Date.now());
  }

  ngOnInit() {

  }
}
