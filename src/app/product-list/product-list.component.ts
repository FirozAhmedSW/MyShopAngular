import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductList: any[] = [];

  constructor(
    private services: ApiService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if query param has categoryId
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.GetProductByCategory(categoryId);
      } else {
        this.GetAllProduct();
      }
    });
  }

  GetAllProduct() {
    this.services.GetProduct().subscribe(
      (res) => {
        this.ProductList = res;
      }
    );
  }

  GetProductByCategory(categoryId: number) {
    this.services.GetProduct().subscribe(
      (res: any[]) => {
        this.ProductList = res.filter(x => x.categoryId == categoryId);
      }
    );
  }

  CartProductBtn(CartObject: any) {
    const UserValueLocalStorage = localStorage.getItem("UserData");
    const UserObject = JSON.parse(UserValueLocalStorage!);

    const CartObjectValue = {
      UserId: UserObject.id,
      ProductId: CartObject.id
    };

    this.services.CartProduct(CartObjectValue).subscribe(
      (res) => {
        this.toaster.success('Cart Success', 'Cart Product', {
          timeOut: 3000,
        });

        // ✅ STEP 1: After adding to cart, fetch updated cart list and notify via BehaviorSubject
        this.services.GetCardProduct(UserObject.id).subscribe(cartRes => {
          this.services.updateCartCount(cartRes.length); // 🔁 Broadcast new count to other components
        });
      }
    );
  }
}
