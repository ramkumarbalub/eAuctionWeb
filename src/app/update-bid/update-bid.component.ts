import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ProductapiService } from '../productapi.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptionsWrapper } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-bid',
  templateUrl: './update-bid.component.html',
  styleUrls: ['./update-bid.component.css'],
  providers: [ProductapiService]
})
export class UpdateBidComponent implements OnInit {

  alertUpdate: boolean = false;
  alertDelete: boolean = false;
  alertZeroRecords: boolean = false;

  productListArray: any = [];
  rowData: any = [];
  buyerInfo: any = {};
  productidselected: any = "";

  form: FormGroup = new FormGroup({
    //firstname: new FormControl(''),    
    //phone: new FormControl(''),
    emailId: new FormControl(''),
    bidPrice: new FormControl(''),
    productId: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, private productapi: ProductapiService) { }

  
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

  onSubmit(): void{
    console.log('the complete value is ', this.form.value);
    this.productapi.updateBidAmount(this.form.value).subscribe((result) => {
      console.log('Bid amount updated', result);

      this.alertUpdate = true;
      this.form.reset({});
      this.LoadGrid();
      
     });
  }

  RemoveBuyer(): void{
    console.log('the remove value is ', this.form.value);
    this.productapi.RemoveBid(this.form.value).subscribe((result) => {
      console.log('Bid removed from auction', result);

      this.alertDelete = true;
      this.form.reset({});

      this.LoadGrid();
      
    });

  }

  LoadGrid(){
    this.productapi.getBidsListForAproduct(this.productidselected).subscribe((result2) =>
      {
        console.log('Revised BidsInfo -- Begin');
        console.log(result2); 
        this.rowData = result2;
        
        console.log('Revised BidsInfo -- end');
      });
  }

onOptionsSelected(value:string){
    console.log('the selected value is ', value);

    this.productidselected = value;
    this.LoadGrid();

    if(this.rowData.length == 0){
      this.alertZeroRecords = true;
    }

  }
  
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e.data);
    this.buyerInfo = e.data;
    this.form.controls['emailId'].setValue(this.buyerInfo.email);
    this.form.controls['productId'].setValue(this.productidselected);
  }

  closeAlert(){
    this.alertUpdate = false;
    this.alertDelete = false;
    this.alertZeroRecords = false;
  }
}
