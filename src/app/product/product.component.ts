import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from './Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() selectedCategoryId: number = 0;

  public UserList: any[] = [];
  allProducts: any[] = [];

  CategoryList: any[] = [];
  product = new Product();
  image: null;
  Id: number = -1;
  UpdateSave: boolean = false;
  CategoryView: boolean = false;
  ProductImageStore: any;

  constructor(private Services: ApiService) { }

  ngOnInit() {
    this.getrequest();
    this.GetCategory();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategoryId']) {
      this.filterByCategory(this.selectedCategoryId);
    }
  }

  filterByCategory(id: number) {
    if (id === 0) {
      this.UserList = this.allProducts;
    } else {
      this.UserList = this.allProducts.filter(p => p.categoryId === id);
    }
  }

  getrequest() {
    this.Services.GetProduct().subscribe((response) => {
      this.allProducts = response;
      this.filterByCategory(this.selectedCategoryId);
    });
  }

  ImageUploadMethod(event: any) {
    if (event.target.files.length > 0) {
      this.ProductImageStore = event.target.files[0];
    }
  }

  SaveChangeMethod() {
    const formData = new FormData();
    formData.append('file', this.ProductImageStore);
    formData.append('object', JSON.stringify(this.product));
    this.Services.PostProduct(formData).subscribe(() => this.getrequest());
    document.getElementById("ModalClose")?.click();
  }

  GetCategory() {
    this.Services.Getcategory().subscribe((res) => {
      this.CategoryList = res;
    });
  }

  CloseMethod() {
    this.CategoryView = true;
  }

  DblClickMethod(Item: any) {
    this.UpdateSave = true;
    this.product.Id = Item.id;
    this.product.ProductName = Item.productName;
    this.image = Item.image;
    this.product.Price = Item.price;
    this.product.Description = Item.description;
    this.product.Quantity = Item.quantity;
    this.product.CategoryId = Item.categoryId;
    document.getElementById("ProductModal")?.click();
  }

  RowClickMethod(item: any) {
    this.Id = this.Id === item.id ? -1 : item.id;
  }

  DeletedRowMethod() {
    if (this.Id > 0) {
      this.Services.DeletedProduct(this.Id).subscribe(() => this.getrequest());
    } else {
      alert("Please select a product to delete.");
    }
  }

  UpdateProduct() {
    this.Services.PutProduct(this.product).subscribe(() => this.getrequest());
    document.getElementById('ModalClose')?.click();
  }

  ModelOpen() {
    this.CategoryView = true;
    this.UpdateSave = false;
    this.product = new Product();
    this.GetCategory();
    document.getElementById("ProductModal")?.click();
  }
}
