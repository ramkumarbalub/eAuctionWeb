import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from './product';
import { BuyerModel } from './buyermodel';
import { JsonPipe } from '@angular/common';
import { UpdateBidModel } from './UpdateBidModel';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {
  urlPostProduct = "https://eauctionapiapi.azure-api.net/v1/Seller/Post";
  //https://localhost:44345/api/v1/Seller/post-product

  urlListProduct = "https://eauctionapiapi.azure-api.net/v1/Seller/ListProductName";
  //https://localhost:44345/api/v1/Seller/listProduct

  urlSelectedProduct = "https://eauctionapiapi.azure-api.net/v1/Seller/GetProductInfo?productId=";
  //https://localhost:44345/api/v1/Seller/getProductInfo?productId=


  urlAddBuyer = "https://eauctionapiapi.azure-api.net/v1/Buyer/PostBuyer";
  //https://localhost:44345/api/v1/Buyer/post-buyer

  urlBidsList = "https://eauctionapiapi.azure-api.net/v1/Buyer/ListBidsAgainstProduct?productid=";
  //https://localhost:44345/api/v1/Buyer/listbidsagainstproduct?productid=


  urlUpdateBidAmount = "https://eauctionapiapi.azure-api.net/v1/Buyer/UpdateBid";
  //https://localhost:44345/api/v1/Buyer/update-bid

  urlDeleteBuyersBid = "https://eauctionapiapi.azure-api.net/v1/Buyer/DeleteBuyerBid";
  //https://localhost:44345/api/v1/Buyer/delete-bid


  constructor(
    private http: HttpClient,
    
  ) { }
  public getProduct(){
    return this.http.get(this.urlPostProduct);
}

public getBidsListForAproduct(value: string){
  console.log('Begin - Get bids list for a product id is', value);
  return this.http.get(this.urlBidsList+value);
}

public getProductInfo(value: string){
  console.log('Get Product Info ', value);
  return this.http.get(this.urlSelectedProduct+value);
}
public ListAllProductsNameAndId(){
  console.log('ListAllProductsNameAndId - Service');
return this.http.get(this.urlListProduct);
}

//Remove the bid from buyer
public RemoveBid(data: any) : Observable<UpdateBidModel> {
  return this.http.post<UpdateBidModel>(this.urlDeleteBuyersBid, JSON.stringify(data), this.httpOptions).pipe(); //"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
}

//Update the Buyers Bid amount
public updateBidAmount(data: any) : Observable<UpdateBidModel> {
  return this.http.post<UpdateBidModel>(this.urlUpdateBidAmount, JSON.stringify(data), this.httpOptions).pipe(); //"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
}
public saveProduct(data: any): Observable<Product> {
    return this.http.post<Product>(this.urlPostProduct, JSON.stringify(data), this.httpOptions).pipe();
}

httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

public saveBuyer(data: any) : Observable<BuyerModel>  {
return this.http.post<BuyerModel>(this.urlAddBuyer, JSON.stringify(data), this.httpOptions).pipe();
}
}
