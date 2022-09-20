import { Component, OnInit } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-test-scss',
  templateUrl: './test-scss.component.html',
  styleUrls: ['./test-scss.component.scss',
]
})
export class TestScssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  public columnDefs: ColDef[] = [
    { field: 'BidAmount'},
    { field: 'Name'},
    { field: 'Email'},
    { field: 'Mobile'}
  ];


  rowData = [
    { BidAmount: 100, Name: 'ABC', Email: 'ABC.com', Mobile: 998899},
    { BidAmount: 200, Name: 'DEF', Email: 'DEF.com', Mobile: 9988991},
    { BidAmount: 300, Name: 'GHI', Email: 'GHI.com', Mobile: 9988991}
  ]
}
