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
  url = "https://localhost:44345/api/v1/Seller/post-product";
  url2 = "https://localhost:44345/api/v1/Seller/getproduct";
  url3 = "https://localhost:44345/api/v1/Seller/show-bids/prd02";
  url4 = "https://localhost:44345/api/v1/Seller/listProduct";
  url5 = "https://localhost:44345/api/v1/Seller/getProductInfo?productId=";

  urlbuyer = "https://localhost:44345/api/v1/Buyer/post-buyer";
  urlBidsList = "https://localhost:44345/api/v1/Buyer/listbidsagainstproduct?productid=";

  //https://localhost:44345/api/v1/Buyer/update-bid?productId=prd4&buyerEmailId=test%40gmail.com&newBidAmount=123
  urlNewBidAmount = "https://localhost:44345/api/v1/Buyer/update-bid";
  urlRemoveBid = "https://localhost:44345/api/v1/Buyer/delete-bid";
  constructor(
    private http: HttpClient,
    
  ) { }
  public getProduct(){
    return this.http.get(this.url);
}

public getBidsListForAproduct(value: string){
  console.log('Begin - Get bids list for a product id is', value);
  return this.http.get(this.urlBidsList+value);
}

public getProductInfo(value: string){
  console.log('Get Product Info ', value);
  return this.http.get(this.url5+value);
}
public ListAllProductsNameAndId(){
  console.log('ListAllProductsNameAndId - Service');
return this.http.get(this.url4);
}

public RemoveBid(data: any) : Observable<UpdateBidModel> {
  //console.log("ProductAPI service - "+this.urlNewBidAmount+"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
  //Modify the Url
  return this.http.post<UpdateBidModel>(this.urlRemoveBid, JSON.stringify(data), this.httpOptions).pipe(); //"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
}

public updateBidAmount(data: any) : Observable<UpdateBidModel> {
  //console.log("ProductAPI service - "+this.urlNewBidAmount+"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
  //Modify the Url
  return this.http.post<UpdateBidModel>(this.urlNewBidAmount, JSON.stringify(data), this.httpOptions).pipe(); //"productId="+ data.productid + "&buyerEmailId=" + data.email +"&newBidAmount="+ data.bidamount);
}
public saveProduct(data: any): Observable<Product> {
    console.log('service data is ', JSON.stringify(data));

    return this.http.post<Product>(this.url, JSON.stringify(data), this.httpOptions).pipe();
    /*
    return this.http.post(this.url, JSON.stringify({
      "productId": "TV123",
      "productname": "Television",
      "shortdescription": "Samsung",
      "detaileddescription": "Samsung 4k Ultra",
      "category": "string",
      "startingprice": 0,
      "bidenddate": "2022-09-13"
    })).subscribe();
    */
}

httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

public saveBuyer(data: any) : Observable<BuyerModel>  {
return this.http.post<BuyerModel>(this.urlbuyer, JSON.stringify(data), this.httpOptions).pipe();
}
}
