import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/configs/environment';
import { ProductsService } from '../../shared/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  product: any[];
  productId;
  IMAGE_URL: string = environment.IMAGE_URL;
  mouseEntered : boolean = false;
  

  constructor(private productSrv: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct();
  }
  onClinkToDetaliPage(item) {
    this.router.navigate(['/online-shop/products/product-detail'], {
      queryParams: { Id: item.productid },
    });
  }
  getProduct() {
    this.product = this.productSrv.getProducts();
  }
}
