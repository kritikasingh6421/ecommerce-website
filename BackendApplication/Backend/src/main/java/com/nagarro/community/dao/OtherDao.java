/**
 * 
 */
package com.nagarro.community.dao;

import java.util.List;

import com.nagarro.community.pojo.Product;

/**
 * @author kritikasingh02
 *
 */
public interface OtherDao {
	
	/**
	 * return list of product references have given input keyword
	 * @param key
	 * @return
	 */
	public List<Product> productSearch(String key);
	
	/**
	 * return list of product references containing given input values
	 * @param key
	 * @param brand
	 * @param rating
	 * @return
	 */
	public List<Product> productFilterByBrand(String key, String brand , int rating);

}
