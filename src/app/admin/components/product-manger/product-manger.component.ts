import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/models/products';
import { AdminService } from '../../shared/admin.service';
import { DeleteDailogComponent } from '../delete-dailog/delete-dailog.component';

@Component({
  selector: 'app-product-manger',
  templateUrl: './product-manger.component.html',
  styleUrls: ['./product-manger.component.css'],
})
export class ProductMangerComponent implements OnInit {
  buttons: Button[] = [
    { name: 'Delete', type: 'delete', color: 'warn', icon: 'delete' },
    { name: 'Edit', type: 'edit', color: 'primary', icon: 'edit' },
  ];
  disableName = false;
  productModel:Product
  displayedColumns: string[] = [
    'productid',
    'productname',
    'productprice',
    'productdescription',
    'categoryproductname',
    'oparator',
  ];
  prodcutArrName: any[] = [];
  dataSource = new MatTableDataSource(this.prodcutArrName);
  constructor(
    private adminSrv: AdminService,
    private matDailog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {}
  tabIndex: number;
  ngOnInit(): void {
    this.onSubmitImportedFilePattern();
  }

  searchForm = new FormGroup({
    searchID: new FormControl(''),
    searchName: new FormControl(''),
  });
  onClick() {
    let disableName: Boolean = false;
    return disableName;
  }
  onSubmitImportedFilePattern() {
    this.adminSrv
      .getProduct(
        this.searchForm.value.searchName,
        this.searchForm.value.searchID
      )
      .subscribe((data: any) => {
        if (data) {
          this.prodcutArrName = data.data[0].Product;
          this.dataSource = new MatTableDataSource(this.prodcutArrName);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickButton(event) {
    console.log(event);

    if (event.action == 'Delete') {
      this.matDailog.open(DeleteDailogComponent, {
        data: {
          onDelete: this.onDeleteProduct.bind(this, event.row.productid),
        },
      });
    } else if (event.action == 'Edit') {
      this.tabIndex = 1;
      this.productModel = event.row
    }
  }

  onDeleteProduct(productId) {
    this.adminSrv.deleteProduct(productId).subscribe((data: any) => {
      if (data.Success) {
        this.matSnackbar.open('Prodcut Successfully Delete', 'X', {
          duration: 5000,
        });
        this.onSubmitImportedFilePattern();
      } else {
        this.matSnackbar.open(' Failed to Delete ', 'X', {
          duration: 5000,
        });
      }
    });
  }
}

export interface Button {
  type: String;
  color: String;
  name: string;
  icon: String;
}
