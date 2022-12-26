/**
 * 
 */
package com.nagarro.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.community.dao.ReviewDao;
import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;

/**
 * @author kritikasingh02
 *
 */
@Service
public class ReviewServiceImpl implements ReviewService{
	
	@Autowired
	private ReviewDao dao;

	public Review createReview(Review review) {
		review.setApproval("no");
		return dao.save(review);
	}

	public void deleteReview(int id) {
		dao.deleteById(id);
	}
	
	public void updateReview(Review review) {
		dao.save(review);
	}

	public Review getReviewById(int id) {
		return dao.findById(id).get();
	}

	public List<Review> getReview() {
		return dao.findAll();
	}


}
