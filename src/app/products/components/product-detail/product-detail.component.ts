import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/configs/environment';
import { Product } from 'src/models/products';
import { ProductsService } from '../../shared/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  selectedProduct: any;
  IMAGE_URL: string = environment.IMAGE_URL;
  pending : boolean = false;
  constructor(
    private productSrv: ProductsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  showReadMore: boolean = false;
  minimize: boolean = false;

  getProduct() {
    this.pending = true
    const { Id } = this.activeRoute.snapshot.queryParams;
    this.productSrv.searchProductID(Id).subscribe(({ data }: any) => {
      if (data) {
        this.selectedProduct = new Product(data.Product[0]);
        console.log(this.selectedProduct);
        const lines =
          (data.Product[0].productdescription.match(/\n/g) || '').length + 1;
        console.log(lines);
        if (lines > 5) {
          this.showReadMore = true;
          this.minimize = true;
        }
        this.pending = false
      }
    });
  }
}
