import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { validateNotEmpty, validateNumber } from 'validation-utils'; // install using npm i validation-utils
import { ProductapiService } from '../productapi.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductapiService]
})
export class AddProductComponent implements OnInit {
  categoryList: any = ["Painting", "Sculptor", "Ornament"];
  form: FormGroup = new FormGroup({
    productId: new FormControl(),
    productname: new FormControl(''),
    shortdescription: new FormControl(''),
    detaileddescription: new FormControl(''),
    category: new FormControl(''),
    startingprice: new FormControl(''),
    bidenddate: new FormControl('')
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private productapi: ProductapiService) { }

  //only number will be add
  keypress(event: any){
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if(event.keyCode != 8 && !pattern.test(inputChar)){
      event.preventDefault();
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        productId: ['', 
            Validators.required
        ],
        productname: ['', 
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30)
          ]
        ],
        shortdescription: ['', Validators.required],
        detaileddescription: ['', Validators.required],
        category: ['', Validators.required],
        startingprice: ['', 
        [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(1),
            Validators.maxLength(15)            
        ]
      ],
      bidenddate: ['']
      }
    );
  }

  onSubmit(): void{
    //console.log('form data is : ', this.form.value);
    this.submitted = true;
    const productm: Product = { productId: "", productname:"", shortdescription: "", detaileddescription: "", category: "", startingprice:"0.00", bidenddate:"2022-09-12" };
    //const e = { ...this.productm, ...this.form.value};
    this.productapi.saveProduct(this.form.value).subscribe((result) => {
      console.log('response received');
      console.log(result);
     });
    if (this.form.invalid){
      return;
    }
  }
  get f(): { [key: string]: AbstractControl }{
    return this.form.controls;
  }

}
