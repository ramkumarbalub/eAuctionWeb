import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { ListBidsComponent } from './list-bids/list-bids.component';
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { UpdateBidComponent } from './update-bid/update-bid.component';
import { TestScssComponent } from './test-scss/test-scss.component';

const routes: Routes = [
  { path: 'addProduct', component: AddProductComponent },
  { path: 'listBids', component: ListBidsComponent},
  { path: 'placeBid', component: PlaceBidComponent},
  { path: 'updateBid', component: UpdateBidComponent},
  { path: 'testscss', component: TestScssComponent}
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
