/**
 * 
 */
package com.nagarro.community.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.community.pojo.Product;
import com.nagarro.community.pojo.Review;
import com.nagarro.community.pojo.User;

/**
 * @author kritikasingh02
 *
 */
@Repository
public interface ReviewDao extends JpaRepository<Review, Integer>{
	
	/*public User getUserById(String id);
	public boolean login(String username, String password);
	public User register(String email, String firstName, String lastName, String password);
	
	public List<Product> getProduct();//String preference
	
	public Review postingReview(String code, float rating, String heading, String review);
	public Review reviewApproval(String reviewId, String action);//updating review by admin
	public boolean requestReview(String code);//request review
	public List status();*/

}
