import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId: any;
  ProductList: any[] = [];


  constructor(private route: ActivatedRoute, private router: Router,private services: ApiService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.GetAllProduct();
  }

GetAllProduct() {
  debugger;
  const tempId = Number(this.productId); // ✅ string → number convert

  this.services.GetCardProduct(tempId).subscribe(
    (res) => {
      this.ProductList = res;
    },
    (err) => {
      console.error("Error loading product:", err);
    }
  );
}



  BacktoHome() {
    this.router.navigate(['/productList']);
  }
}
