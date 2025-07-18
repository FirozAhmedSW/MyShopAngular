import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainContantComponent } from './main-contant/main-contant.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './Navbar/Navbar.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SineUpComponent } from './sine-up/sine-up.component';
const routes: Routes = [
  {path : '', component: LoginUserComponent},
  {path : 'mainComponent', component: MainContantComponent},
  {path : 'header',component: HeaderComponent},
  {path : 'Category',component: CategoryComponent},
  {path : 'Product',component: ProductComponent},
  {path : 'cartproduct',component: CartProductComponent},
  {path : 'productList',component: ProductListComponent},
  {path : 'manageAccount',component: ManageAccountComponent},
  {path : 'orderDetails',component: OrderDetailsComponent},
  {path : 'sineup',component: SineUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
