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
import org.springframework.web.bind.annotation.PostMapping;
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
@RequestMapping("/api/v1/user/")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@Autowired
	private ReviewService reviewService;

	/* USER REGISTRATION API */

	@CrossOrigin(origins = "http://localhost:4200/")
	@PostMapping
	public User registerUser(@RequestBody User user) {
		try {
			User u = userService.getUserById(user.getEmail());
			return null;
		} catch (Exception e) {

			return userService.createUser(user);
		}
	}

	/* USER AUTHENTICATION API */

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/{email}/{password}")
	public List login(@PathVariable String email, @PathVariable String password) {
		User u = userService.getUserById(email);
		List<String> userName = new ArrayList<>();
		if (u != null) {
			if ((u.getEmail().equals(email)) && (u.getPassword().equals(password))) {
				userName.add(0, u.getFirstname());
				userName.add(1, u.getLastname());
				return userName;
			}
		}
		return userName;
	}

	/* API FOR STATISTICS */

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/size")
	public int allUserSize() {
		return userService.getUser().size();
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product/size")
	public int allProductSize() {
		return productService.getProduct().size();
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/review/size")
	public int allReviewSize() {
		return reviewService.getReview().size();
	}

	/* PRODUCT LIST ACCORDING TO SEARCH BY USER */

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product/search/{key}")
	public List<Product> allSearchProduct(@PathVariable String key) {
		return productService.productSearch(key);
	}

	/* PRODUCT FILTER ACCORDING TO THE BRAND & RATING */
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product/filter/{key}/{brand}/{rating}")
	public List<Product> productFilterByBrand(@PathVariable String key, @PathVariable String brand,
			@PathVariable int rating) {
		return productService.productFilterByBrand(key, brand, rating);
	}

	/* APPROVED REVIEW FOR USER */

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/review/approved/{code}")
	public List<Review> allApprovedReview(@PathVariable String code) {
		List<Review> approvedReview = new ArrayList<>();

		// Product product = productService.getProductById(code);
		// if(product.getApproval().equalsIgnoreCase(Constants.YES)) {
		List<Review> allReview = reviewService.getReview();
		Iterator itr = allReview.iterator();
		while (itr.hasNext()) {
			Review r = (Review) itr.next();
			if (r.getApproval().equalsIgnoreCase("yes") && r.getProductCode().equals(code)) {
				approvedReview.add(r);
			}
		}
		// }
		return approvedReview;
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product/check/{id}")
	public List<String> checkReview(@PathVariable String id) {
		List<String> status = new ArrayList<>();
		try {
			Product p = productService.getProductById(id);
			if (p.getApproval().equalsIgnoreCase(Constants.YES)) {
				status.add(0, "approved");
			} else {
				status.add(0, "pending");
			}
		} catch (Exception e) {
			status.add(0, "unavailable");
		}
		return status;
	}

	/* TOTAL REVIEWS */

	@CrossOrigin(origins = "http://localhost:4200/")
	@PutMapping("/review/noOfReviews")
	public List<Product> noOfReviews() {
		int totalNumberOfReviews = 0;

		List<Product> products = productService.getProduct();
		List<Review> approvedReview = new ArrayList<>();
		List<Review> allReview = reviewService.getReview();
		Iterator iPro = products.iterator();
		while (iPro.hasNext()) {
			Product p = (Product) iPro.next();
			Iterator itr = allReview.iterator();
			float avgRating = 0;
			while (itr.hasNext()) {
				Review r = (Review) itr.next();
				if (r.getApproval().equalsIgnoreCase(Constants.YES) && r.getProductCode().equals(p.getCode())) {
					avgRating += r.getRating();
					approvedReview.add(r);
				}
			}
			totalNumberOfReviews = approvedReview.size();
			p.setNoOfReviews(totalNumberOfReviews);
			if (totalNumberOfReviews != 0) {
				avgRating = avgRating / totalNumberOfReviews;
			}
			p.setAvgRating(avgRating);
			//productService.createProduct(p);
			productService.updateProduct(p);
			approvedReview.clear();
		}

		return products;
	}

	/* BASIC CURD API FOR USER */
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping
	public List<User> allUser() {
		return userService.getUser();
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/{email}")
	public User getUserById(@PathVariable String email) {
		return userService.getUserById(email);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@PutMapping("/{id}")
	public ResponseEntity<User> updateRecord(@PathVariable String id, @RequestBody User user) {

		User u = userService.getUserById(id);
		u.setEmail(user.getEmail());
		u.setFirstname(user.getFirstname());
		u.setLastname(user.getLastname());
		u.setPassword(user.getPassword());
		//userService.createUser(u);
		userService.updateUser(u);
		return ResponseEntity.ok(u);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@DeleteMapping("/{id}")
	public void deleteRecord(@PathVariable String id) {
		userService.deleteUser(id);
	}

	/* BASIC CURD API FOR PRODUCTS */
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product")
	public List<Product> allProduct() {
		return productService.getProduct();
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@PostMapping("/product")
	public Product createProduct(@RequestBody Product product) {
		
		return productService.createProduct(product);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/product/{id}")
	public Product getProductById(@PathVariable String id) {
		return productService.getProductById(id);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@PutMapping("/product/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {

		Product p = productService.getProductById(id);
		p.setBrand(product.getBrand());
		p.setName(product.getName());
		productService.updateProduct(p); 
		return ResponseEntity.ok(p);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@DeleteMapping("/product/{id}")
	public void deleteProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}

	/* BASIC CURD API FOR REVIEWS */

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/review")
	public List<Review> allReview() {
		return reviewService.getReview();
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@PostMapping("/review")
	public Review createReview(@RequestBody Review review) {
		return reviewService.createReview(review);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/review/{id}")
	public Review getReviewById(@PathVariable int id) {
		return reviewService.getReviewById(id);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@PutMapping("/review/{id}")
	public ResponseEntity<Review> updateReview(@PathVariable int id, @RequestBody Review review) {

		Review r = reviewService.getReviewById(id);
		r.setProductCode(review.getProductCode());
		r.setHeading(review.getHeading());
		r.setRating(review.getRating());
		r.setReview(review.getReview());
		r.setApproval(review.getApproval());
		reviewService.updateReview(r); 
		return ResponseEntity.ok(r);
	}

	@CrossOrigin(origins = "http://localhost:4200/")
	@DeleteMapping("/review/{id}")
	public void deleteReview(@PathVariable int id) {
		reviewService.deleteReview(id);
	}

}
