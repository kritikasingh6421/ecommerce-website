/**
 * 
 */
package com.nagarro.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.community.constants.Constants;
import com.nagarro.community.dao.OtherDao;
import com.nagarro.community.dao.ProductDao;
import com.nagarro.community.dao.ReviewDao;
import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;
import com.nagarro.community.pojo.User;

/**
 * @author kritikasingh02
 *
 */
@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductDao dao;
	
	@Autowired
	private OtherDao otherDao;

	public Product createProduct(Product product) {
		product.setAvgRating(0);
		product.setNoOfReviews(0);
		product.setApproval(Constants.NO);
		return dao.save(product);
	}

	public void deleteProduct(String code) {
		
		dao.deleteById(code);
	}
	
	public void updateProduct(Product p) {
		dao.save(p);
	}

	public Product getProductById(String code) {
		return dao.findById(code).get();
	}

	public List<Product> getProduct() {
		return dao.findAll();
	}

	@Override
	public List<Product> productSearch(String key) {
		return otherDao.productSearch(key);
	}
	
	public List<Product> productFilterByBrand(String key, String brand, int rating){
		return otherDao.productFilterByBrand(key,brand,rating);
	}

}
