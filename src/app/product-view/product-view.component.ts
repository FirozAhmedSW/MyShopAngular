import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId: number = 0;
  product: any = null;   // ✅ একক product

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private services: ApiService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = Number(idParam); 
      this.GetSingleProduct();
    }
  }

  GetSingleProduct() {
    this.services.SingleProductGet(this.productId).subscribe(
      (res: any) => {
        this.product = res;  // ✅ শুধু একক object
      },
      (err) => {
        console.error("Error loading product:", err);
      }
    );
  }

  BacktoHome() {
    this.router.navigate(['/productList']);
  }

  CartProductBtn(product: any) {
    console.log("Added to cart:", product);
    // এখানে cart এ add করার logic লিখবেন
  }
}
