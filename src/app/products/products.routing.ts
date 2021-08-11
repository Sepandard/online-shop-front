import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductLayoutComponent } from './components/product-layout/product-layout.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: 'product-list',
        component: ProductCardComponent,
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
      }, 
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard] 
      },
    ],
  },
  {
    path: '**',   
    redirectTo: '/product-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
