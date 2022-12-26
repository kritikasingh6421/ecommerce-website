/**
 * 
 */
package com.nagarro.community.service;

import java.util.List;

import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;
import com.nagarro.community.pojo.User;

/**
 * @author kritikasingh02
 *
 */
public interface ProductService {

	public Product createProduct(Product product);
	
	public void deleteProduct(String code);
	
	public void updateProduct(Product p);//String code
	
	public Product getProductById(String code);
	
	public List<Product> getProduct();
	
	public List<Product> productSearch(String key);
	
	public List<Product> productFilterByBrand(String key , String brand, int rating);

}
