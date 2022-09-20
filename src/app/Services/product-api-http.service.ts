import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class ProductApiHttpService{
    url = "https://localhost:44345/api/v1/Seller/add-product/";
    constructor(
        //Angular Modules
        private http: HttpClient
    ) {}

    public getProduct(){
        return this.http.get(this.url);
    }
    public saveProduct(data: any){
        console.log(data);
        return this.http.post(this.url, data);
    }
}