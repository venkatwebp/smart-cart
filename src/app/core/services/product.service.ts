import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../models/product.model";


@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private productUrl = 'assets/data/products.json';

    constructor(private http: HttpClient){}

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.productUrl);
    }

    getProductById(id: number): Observable<Product | undefined>{
        return this.getProducts().pipe(
            map(products => products.find(product => product.id === id))
        )
    }


}