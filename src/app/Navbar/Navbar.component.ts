import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ImageSource: any;
  CategoryList: any[] = [];
  UserName: string = 'User Name';
  cartNumber: number = 0;


  @Output() categorySelected = new EventEmitter<number>();

  SelectedCategoryId: number = 0;

  constructor(private services: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCategories();

    this.loadCartCount();

    this.services.cartCount$.subscribe(count => 
      {this.cartNumber = count;}
    );
  }



  

  loadUserData(): void {
    const obj = localStorage.getItem('UserData');
    if (obj) {
      const userObj = JSON.parse(obj);
      this.UserName = userObj.name;

      this.services.GetSingleUser(userObj.id).subscribe(response => {
        this.ImageSource = response;
      });
    }
  }

  loadCartCount(): void {
  const obj = localStorage.getItem("UserData");
  if (!obj) return;
  const userObj = JSON.parse(obj);

  this.services.GetCardProduct(userObj.id).subscribe(res => {
    this.cartNumber = res.length;
    this.services.updateCartCount(res.length); // optional
  });
}


  loadCategories(): void {
    this.services.Getcategory().subscribe(res => {
      this.CategoryList = res;
    });
  }

  // Fixed method name matching template now
  CategoryChanged(event: any): void {
    this.SelectedCategoryId = +event.target.value;
    this.categorySelected.emit(this.SelectedCategoryId);

    if (this.SelectedCategoryId === 0) {
      this.router.navigate(['/productList']); // show all products
    } else {
      this.router.navigate(['/productList'], {
        queryParams: { categoryId: this.SelectedCategoryId }
      });
    }
  }

  MainLogoMethod(): void {
    this.router.navigate(['/productList']);
  }

  // Fixed spelling from MangePageMethos -> ManagePageMethod
  ManagePageMethod(): void {
    this.router.navigate(['/manageAccount']);
  }

  LogOutMethod(): void {
    this.services.isloginSubject.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  OrderDetailsMethod(): void {
    this.router.navigate(['/orderDetails']);
  }

  CartMethod(): void {
    this.router.navigate(['/cartproduct']);
  }
}
