import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * *******************************************************
 * TODO: create types for all any's in the class please!!!
 * *******************************************************
 */

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cartItemList: any = [];
	productList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
	search: BehaviorSubject<string> = new BehaviorSubject<string>("");

	/**
	 * Getting the list of products from productList(BehaviorSubject)
	 * 
	 * 
	 * @void
	 */
	getProduct(): Observable<any> {
		return this.productList.asObservable();
	}

	/**
	 * Adding single item to the cart, and updating the list of items in the cart
	 * 
	 * 
	 * @void
	 */
	setProduct(product: any): void {
		this.cartItemList.push(...product);
		this.productList.next(product);
	}

	/**
	 * Adding single item to the cart, and updating the list of items in the cart
	 * 
	 * 
	 * @void
	 */
	addToCart(product: any): void {
		this.cartItemList.push(product);
		this.productList.next(this.cartItemList);
		this.getTotalPrice();
	}

	/**
	 * Sum up the total price of selected items
	 * 
	 * 
	 * @return grandTotal - all prices combined
	 */
	getTotalPrice(): number {
		let grandTotal: number = 0;
		this.cartItemList.map((a: any) => {
			grandTotal += a.total;
		});

		return grandTotal;
	}

	/**
	 * Remove one item from the users cart
	 * 
	 * @param product - forward one product from the current listed items
	 * @void
	 */
	removeCartItem(product: any): void {
		this.cartItemList.map((a: any, index: any) => {
			if (product.id === a.id) {
				this.cartItemList.splice(index, 1);
			}
		});

		this.productList.next(this.cartItemList);
	}

	/**
	 * Remove all items from the users cart
	 * 
	 * @void
	 */
	removeAllCart(): void {
		this.cartItemList = [];
		this.productList.next(this.cartItemList);
	}
}
