import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ProductapiService } from '../productapi.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-bids',
  templateUrl: './list-bids.component.html',
  styleUrls: ['./list-bids.component.css'],
  providers: [ProductapiService]
})
export class ListBidsComponent implements OnInit {
  productList: any = ["ABC", "DEF"];
  productListArray: any = [];
  productInfo: any = {};
  rowData: any = [];

  productName: string = 'testProd';
  shortDesc: string = 'SD';
  detailedDesc: string = 'DD';
  category: string = 'CAT';
  startingPrice: any = 5000.00;
  bidEndDate:any = '01-01-2022';
  /*
  productListArray: any = [
    { "productId" : "prd02", "productName": "Television" },
    { "productId" : "prd03", "productName": "Refridgerator" },
    { "productId" : "prd04", "productName": "Sofa" }
  ]
  */
  constructor(private formBuilder: FormBuilder, private productapi: ProductapiService) {
    
   }


   public columnDefs: ColDef[] = [
    { field: 'firstname'},
    { field: 'phone'},
    { field: 'email'},
    { field: 'bidamount'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  }

  ngOnInit(): void {
    //Call API during form load
    //It returns ProductId and ProductName

    //Bind this to the Drop-down
    this.productapi.ListAllProductsNameAndId().subscribe((result) => {
      console.log('Product name list -- Begin');
      console.log(result);
      this.productListArray = result;
      console.log('Product name list -- end');
    });
  }
 
  onOptionsSelected(value:string){
    console.log('the selected value is ', value);

    this.productapi.getProductInfo(value).subscribe((result) => {
      console.log('Get ProductInfo -- Begin');
      console.log(result); 
      this.productInfo = result;
      console.log('Get ProductInfo -- end');
    });

    this.productapi.getBidsListForAproduct(value).subscribe((result1) =>
    {
      console.log('Get BidsInfo -- Begin');
      console.log(result1); 
      this.rowData = result1;
      console.log('Get BidsInfo -- end');
    });
  }
  
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e.data.bidamount);
  }
/*
  rowData = [
    { BidAmount: 100, Name: 'ABC', Email: 'ABC.com', Mobile: 998899},
    { BidAmount: 200, Name: 'DEF', Email: 'DEF.com', Mobile: 9988991},
    { BidAmount: 300, Name: 'GHI', Email: 'GHI.com', Mobile: 9988991}
  ]
*/
/*
  rowData = [
    { "firstname" : "CD elect", "phone" : "12345678", "email" : "12345@gmail.com", "bidamount" : "250000" }];
*/
}
