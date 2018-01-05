import { AuthDataService } from './services/auth.service';
import { loginComponent } from './login/login.component';
import { adminOrdersrComponent } from './admin/Orders/orders.component';
import { adminProductsComponent } from './admin/products/products.component';
import { headerComponent } from './header/header.component';
import { myOrderComponent } from './myOrder/myOrder.component';
import { shoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { checkOutComponent } from './checkOut/checkOut.component';
import { productsComponent } from './product/product.component';
import { orderSuccessComponent } from './orderSuccess/orderSuccess.component';
import { homeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Angular2SocialLoginModule } from "angular2-social-login";


import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';

let providers = {
    "google": {
      "clientId": "986680250790-02ih0hqkebtafvhahm1umj12rqd2st8v.apps.googleusercontent.com"
    }
  };



@NgModule({
    declarations: [
        AppComponent,headerComponent,shoppingCartComponent,checkOutComponent,
        productsComponent,orderSuccessComponent,homeComponent,myOrderComponent,
        adminProductsComponent,adminOrdersrComponent,loginComponent],
    imports: [
        BrowserModule, HttpModule,NgbModule.forRoot(),
        Angular2SocialLoginModule,FormsModule,
        RouterModule.forRoot([
            {path:'',component:homeComponent},
            {path:'product',component:productsComponent},
            {path:'shopping-cart',component:shoppingCartComponent},
            {path:'check-out',component:checkOutComponent},
            {path:'my-order',component:myOrderComponent},
            {path:'order-success',component:orderSuccessComponent},
            {path:'login',component:loginComponent},
            {path:'admin/products',component:adminProductsComponent},
            {path:'admin/orders',component:adminOrdersrComponent},
        ])
     ],
    providers:[AuthDataService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

Angular2SocialLoginModule.loadProvidersScripts(providers);