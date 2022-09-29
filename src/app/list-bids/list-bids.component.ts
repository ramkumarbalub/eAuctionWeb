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
}
