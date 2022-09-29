import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductapiService } from '../productapi.service';

@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.css'],
  providers: [ProductapiService]
})
export class PlaceBidComponent implements OnInit {
  productListArray: any = [];
  productid2: string = '';
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pin: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    bidamount: new FormControl(''),
    productid: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private productapi: ProductapiService) {
    
  }

  ngOnInit(): void {

     //Bind this to the Drop-down
     this.productapi.ListAllProductsNameAndId().subscribe((result) => {
      console.log('Product name list -- Begin');
      console.log(result);
      this.productListArray = result;
      console.log('Product name list -- end');
    });

    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],        
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pin: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required, 
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        bidamount: ['', Validators.required],
        productid: ['']

      });
  }

  onOptionsSelected(value:string){
    console.log('the selected value is ', value);
    this.productid2 = value;
    this.form.controls['productid'].setValue(this.productid2);
  }

  onSubmit(): void{
    console.log('form data is : ', this.form.value);
    this.submitted = true;
    this.productapi.saveBuyer(this.form.value).subscribe((result) => {
      console.log('Buyer response received', result);
     });

    if (this.form.invalid){
      return;
    }
  }

  get f(): { [key: string]: AbstractControl }{
    return this.form.controls;
  }

}
