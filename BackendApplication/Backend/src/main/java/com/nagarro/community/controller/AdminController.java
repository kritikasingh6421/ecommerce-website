/**
 * 
 */
package com.nagarro.community.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.community.constants.Constants;
import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;
import com.nagarro.community.pojo.User;
import com.nagarro.community.service.ProductService;
import com.nagarro.community.service.ReviewService;
import com.nagarro.community.service.UserService;

/**
 * @author kritikasingh02
 *
 */
@RestController
@RequestMapping("api/v1/admin/")
public class AdminController {
	
	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private ProductService productService;
	
	/* ADMIN API FUNCTIONS */
	
	/* FOR NEW REVIEWS */
	@CrossOrigin(origins="http://localhost:4200/")
	@GetMapping("/review")
	public List<Review> allReview() {
		List<Review> pendingReview = new ArrayList<>();
		List<Review> allReview = reviewService.getReview();
		Iterator itr = allReview.iterator();
		while(itr.hasNext()) {
			Review r = (Review)itr.next();
			if(r.getApproval().equalsIgnoreCase(Constants.NO)) {
				pendingReview.add(r);
			}
		}
		return pendingReview;
	}
	
	/* FOR REVIEW APPROVAL */
	@CrossOrigin(origins="http://localhost:4200/")
	@PutMapping("/approve/{id}")
	public ResponseEntity<Review> approveReview(@PathVariable int id) {

		Review r = reviewService.getReviewById(id);
		r.setApproval(Constants.YES);
		reviewService.updateReview(r); //createReview(r);
		return ResponseEntity.ok(r);
	}
	
	/* FOR REVIEW REJECTION */
	@CrossOrigin(origins="http://localhost:4200/")
	@DeleteMapping("/reject/{id}")
	public void rejectReview(@PathVariable int id) {
		reviewService.deleteReview(id);
	}
		
	/* FOR NEW PRODUCTS */
	@CrossOrigin(origins="http://localhost:4200/")
	@GetMapping("/product")
	public List<Product> allProduct() { 
		List<Product> pendingProduct = new ArrayList<>();
		List<Product> allProduct = productService.getProduct();
		Iterator itr = allProduct.iterator();
		while(itr.hasNext()) {
			Product p = (Product)itr.next();
			if(p.getApproval().equalsIgnoreCase(Constants.NO)) {
				pendingProduct.add(p);
			}
		}
		return pendingProduct;
	}
	
	/* FOR PRODUCT APPROVAL */
	@CrossOrigin(origins="http://localhost:4200/")
	@PutMapping("/product-approve/{id}")
	public ResponseEntity<Product> approveProduct(@PathVariable String id) {
		Product p = productService.getProductById(id);
		p.setApproval(Constants.YES);
		//productService.createProduct(p);
		productService.updateProduct(p);
		return ResponseEntity.ok(p);
	}

	/* FOR PRODUCT REJECTION */
	@CrossOrigin(origins="http://localhost:4200/")
	@DeleteMapping("/product-reject/{id}")
	public void rejectProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}
	
}
