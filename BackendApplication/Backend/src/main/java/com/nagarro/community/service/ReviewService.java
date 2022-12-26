/**
 * 
 */
package com.nagarro.community.service;

import java.util.List;

import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;

/**
 * @author kritikasingh02
 *
 */
public interface ReviewService {
	
    public Review createReview(Review review);
	
	public void deleteReview(int id);
	
	public void updateReview(Review review);
	
	public Review getReviewById(int id);
	
	public List<Review> getReview();

}
