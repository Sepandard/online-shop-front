import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { ProductLayoutComponent } from './components/product-layout/product-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingModule } from './products.routing';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MenuComponent } from '../layout/components/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ProfileComponent } from './components/profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseService } from 'shared/base-service.service';
import { ProductsService } from './shared/products.service';
import { PipesModule } from '../shared/pipes/pipes.module';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    ProductCardComponent,
    ProductLayoutComponent,
    ProductListComponent,
    ProductDetailComponent,
    MenuComponent,
    ProfileComponent,
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        {
          name: 'minlength',
          message: 'your password must be more than 8 char',
        },
      ],
    }),
    FormlyMaterialModule,
    MatTabsModule,
    MatSnackBarModule,
    PipesModule,

    
  ],
  providers: [BaseService, ProductsService],
})
export class ProdutsModule {}
