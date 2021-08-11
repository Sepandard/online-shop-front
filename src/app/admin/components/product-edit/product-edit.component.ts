import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from 'src/configs/environment';
import { Product } from 'src/models/products';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  @Input() product: Product;
  addProductform = new FormGroup({});
  addProductformModel: any = {};
  addProductformConfig: FormlyFieldConfig[];
  selectedFile: File;
  fileUploaded: boolean = false;
  showProgress: boolean = false;
  IMAGE_URL : string = environment.IMAGE_URL

  constructor(private adminSrv: AdminService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.initForm();
    this.addProductformModel = this.product
  }
  onSubmit() {
    console.log(this.addProductformModel);
    this.adminSrv.postProduct(this.addProductformModel);
  }
  onRestForm() {
    this.addProductform.reset();
  }

  onSelectFile($event?) {
    this.showProgress = true;
    let imageId: number;
    this.selectedFile = <File>$event.target.files[0];
    if (this.selectedFile.size > 200000) {
      this.snackbar.open('File must be smaller than 2 MB', 'X', {
        duration: 5000,
      });
      this.showProgress = false;
      this.fileUploaded = false;
    } else {
      this.adminSrv
        .onUploadImage('file', 'product/insetImage', this.selectedFile)
        .subscribe((data: any) => {
          this.fileUploaded = data.Success;
          if (data.Success) {
            imageId = data.data[0][0].image_id;

            this.addProductformModel = {
              ...this.addProductformModel,
              productimageid: imageId,
            };

            this.snackbar.open('Upload completed successfully', 'X', {
              duration: 5000,
            });
          } else {
            this.snackbar.open('someThing went wrong', 'X', { duration: 5000 });
          }
          this.showProgress = false;
        });
    }
  }
  initForm() {
    this.adminSrv.getCategoryMenu();
    this.addProductformConfig = [
      {
        fieldGroupClassName: 'flex-container',
        fieldGroup: [
          {
            className: 'flex-50  padding-15 ',
            key: 'productname',
            type: 'input',
            templateOptions: {
              label: 'Product name',
              required: true,
            },
          },
          {
            className: 'flex-50  padding-15 ',
            key: 'productprice',
            type: 'input',
            templateOptions: {
              label: 'Product price',
              required: true,
            },
          },

          {
            className: 'flex-50  padding-15 ',
            key: 'productdescription',
            type: 'textarea',
            templateOptions: {
              label: 'Product description',
              required: true,
              rows: 3,
            },
          },
          {
            className: 'flex-50  padding-15 ',
            key: 'productcategoryid',
            type: 'select',
            templateOptions: {
              label: 'Product category ',
              options: this.adminSrv.CategoryMenu$,
              valueProp: 'categoryproductid',
              labelProp: 'categoryproductname',
              required: true,
            },
          },
        ],
      },
    ];
  }
}
