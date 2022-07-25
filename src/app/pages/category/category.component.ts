import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private route:ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productService.getByCategory(this.categoryId,this.limit,this.offset);
        }else{
          return [];
        }
      })/*,
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productService.getByCategory(this.categoryId,this.limit,this.offset);
        }else{
          return [];
        }
      }),
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productService.getByCategory(this.categoryId,this.limit,this.offset);
        }else{
          return [];
        }
      }),
      */
    )
    .subscribe(data => {
      this.products = data;
    })
  }
}
