import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import ReactiveFormsModule
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

import { MatMenuModule} from '@angular/material/menu';
import { AddProductComponent } from './add-product/add-product.component';
import { AppRoutingModule } from './app-routing.module';
import { ListBidsComponent } from './list-bids/list-bids.component';
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { UpdateBidComponent } from './update-bid/update-bid.component';
import { TestScssComponent } from './test-scss/test-scss.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListBidsComponent,
    PlaceBidComponent,
    UpdateBidComponent,
    TestScssComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NoopAnimationsModule,
    MatMenuModule,
    AppRoutingModule,
    AgGridModule,
    MatDatepickerModule,
    HttpClientModule
  ],
  exports: [
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MenuMaterial{}
