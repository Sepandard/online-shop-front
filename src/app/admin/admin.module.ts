import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OrderMangerComponent } from './components/order-manger/order-manger.component';
import { ProductMangerComponent } from './components/product-manger/product-manger.component';
import { AdminRoutingModule } from './admin.routing';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { DeleteDailogComponent } from './components/delete-dailog/delete-dailog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdminService } from './shared/admin.service';
import { BaseService } from 'shared/base-service.service';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
@NgModule({
  declarations: [
    AdminLayoutComponent,
    AddProductComponent,
    OrderMangerComponent,
    ProductMangerComponent,
    AdminNavbarComponent,
    ButtonRendererComponent,
    DeleteDailogComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
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
    MatInputModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatProgressBarModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers : [BaseService,AdminService],

})
export class AdminModule {}
