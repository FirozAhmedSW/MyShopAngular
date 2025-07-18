import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  ProductList: any[] = [];
  selectAll: boolean = false;
  TotalPrice: number = 0;

  CartProductCount: number = 0;

  constructor(
    private services: ApiService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetAllProduct();
    
  }

  

  GetAllProduct(): void {
    const obj = localStorage.getItem("UserData");
    if (!obj) return;
    const UserObject = JSON.parse(obj);

    this.services.GetCardProduct(UserObject.id).subscribe(res => {
            debugger;
      this.ProductList = res;
     this.CartProductCount = res.length;
      this.services.updateCartCount(this.CartProductCount); // ✅ notify others


      // Reset selections & totals
      this.selectAll = false;
      this.TotalPrice = 0;
      this.ProductList.forEach(p => p.selected = false);
    });
  }

  toggleSelectAll(): void {
    this.ProductList.forEach(c => c.selected = this.selectAll);

    if (this.selectAll) {
      this.TotalPrice = this.selectedCheckboxes.reduce((sum, item) => sum + item.Price, 0);
    } else {
      this.TotalPrice = 0;
    }
  }

  checkboxChanged(item: any): void {
    this.selectAll = this.areAllCheckboxesSelected();

    if (item.selected) {
      this.TotalPrice += item.Price;
    } else {
      this.TotalPrice -= item.Price;
    }
  }

  get selectedCheckboxes(): any[] {
    return this.ProductList.filter(c => c.selected);
  }

  areAllCheckboxesSelected(): boolean {
    return this.ProductList.length > 0 && this.ProductList.every(c => c.selected);
  }

  DeletedMethod(item: any): void {
    this.services.DeletedCartProduct(item.Id).subscribe(() => {
      this.toaster.success('Deleted Successfully', 'Deleted', {
        timeOut: 3000,
      });
      this.GetAllProduct();
    });
  }

  OrderBtn(): void {
    const obj = localStorage.getItem("UserData");
    if (!obj) {
      this.toaster.error('User not logged in', 'Error');
      return;
    }
    const UserObject = JSON.parse(obj);

    if (this.selectedCheckboxes.length === 0) {
      this.toaster.warning('Please select at least one product', 'Warning');
      return;
    }

    const orderDTO = {
      userId: UserObject.id,
      total: this.TotalPrice,
      orderList: this.selectedCheckboxes
      // add other properties if your API needs
    };

    this.services.OrderPost(orderDTO).subscribe({
      next: (res) => {
        this.toaster.success('Order placed successfully', 'Success');
        this.router.navigate(['/orderDetails']);
      },
      error: () => {
        this.toaster.error('Order failed', 'Error');
      }
    });
  }
}
