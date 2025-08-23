import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  config: any;

  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();
  public isloginSubject = new Subject<boolean>();

    updateCartCount(count: number): void {
    this.cartCountSource.next(count);
  }




  IsTrue: boolean = true;
  constructor(private http: HttpClient) {
    let token = localStorage.getItem("Token")
    this.config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  }


  IsloginCheack(): boolean {
    debugger
    let result = false;
    if (localStorage.getItem("Token") != null) {  
      debugger
      result = true;
    }
    return result;
  }


  //Login User Api Is here
  LoginUser(LoginObje: any): Observable<any> {
    debugger
    return this.http.post<any>("https://localhost:7004/api/User/JwtLogin", LoginObje, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }


  //Product All Requrat is Here
  GetProduct(): Observable<any> {
    return this.http.get<any>("https://localhost:7004/api/Product/GetAllProduct", this.config)
  }
  //Get Card Product
  GetCardProduct(Id: any): Observable<any> {
    debugger
    return this.http.get<any>("https://localhost:7004/api/CartProduct/GetAll?Id=" + Id, this.config)
  }
  DeletedCartProduct(id: any): Observable<any> {
    return this.http.delete<any>("https://localhost:7004/api/CartProduct/DeletedProduct?Id=" + id, this.config)
  }
  GetOrder(id: number): Observable<any> {
    return this.http.get<any>("https://localhost:7004/api/Order/GetAllOrder?Id=" + id, this.config)
  }








  PostProduct(FormDat: any): Observable<any> {
    //Post request for user post
    return this.http.post("https://localhost:7004/api/Product/AddProduct", FormDat);
  }
  CartProduct(Object: any): Observable<any> {
    return this.http.post("https://localhost:7004/api/CartProduct/AddCartProduct", Object, this.config);
  }
  PutProduct(data: any): Observable<any> {
    return this.http.put<any>("https://localhost:7004/api/Product/UpdateProduct", data, this.config)
  }

  DeletedProduct(id: any): Observable<any> {
    return this.http.delete<any>("https://localhost:7004/api/Product/DeletedProduct?Id=" + id, this.config)
  }


  //category Request here
  Getcategory(): Observable<any> {
    return this.http.get<any>("https://localhost:7004/api/Quategory/GetAllQuategory", this.config)
  }
  Postcategory(data: any): Observable<any> {

    return this.http.post<any>("https://localhost:7004/api/Quategory/AddQuategory", data, this.config)
  }
  Putcategory(data: any): Observable<any> {
    return this.http.put<any>("https://localhost:7004/api/Quategory/UpdateQuategory", data, this.config)
  }
  Deletedcategory(id: any): Observable<any> {
    return this.http.delete<any>("https://localhost:7004/api/Quategory/DeletedQuategory?Id=" + id, this.config)
  }

  //User Info Is here

  GetUser(): Observable<any> {
    return this.http.get<any>("https://localhost:7004/api/User/GetAllUser", this.config)
  }
  GetSingleUser(id: number): Observable<any> {
    return this.http.get<any>("https://localhost:7004/api/User/GetSingleUser?Id=" + id, this.config)
  }
  PostUser(FromData: any): Observable<any> {
    debugger
    return this.http.post("https://localhost:7004/api/User/AddUser", FromData);
  }
  PutUser(data: any): Observable<any> {
    return this.http.put<any>("https://localhost:7004/api/User/UpdateUser", data, this.config)
  }

  
  DeletedUser(id: any): Observable<any> {
    return this.http.delete<any>("https://localhost:7004/api/User/DeletedUser?Id=" + id, this.config)
  }

  // Order Request is here
  OrderPost(orderObject: any): Observable<any> {
    return this.http.post<any>("https://localhost:7004/api/Order/AddOrder", orderObject, this.config)
  }



//user detiels 

UpdateUser(id: number, data: any): Observable<any> {
  return this.http.put<any>("https://localhost:7004/api/User/UpdateUser", data, this.config);
}

DeleteUser(id: number): Observable<any> {
  return this.http.delete<any>("https://localhost:7004/api/User/DeletedUser?Id=" + id, this.config);
}














}


