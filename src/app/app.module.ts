import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainContantComponent } from './main-contant/main-contant.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { NavbarComponent } from './Navbar/Navbar.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SineUpComponent } from './sine-up/sine-up.component';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { ProductViewComponent } from './product-view/product-view.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContantComponent,
    ProductComponent,
    CategoryComponent,
    NavbarComponent,
    LoginUserComponent,
    CartProductComponent,
    ProductListComponent,
    ManageAccountComponent,
    OrderDetailsComponent,
    SineUpComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
