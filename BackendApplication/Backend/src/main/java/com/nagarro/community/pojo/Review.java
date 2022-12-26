package com.nagarro.community.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;


/**
 * Review is class which allow an application to initialize Review attributes
 * during new object creation for Review.
 * @author kritikasingh02
 *
 */
@Entity
@Table(name="Review")
public class Review {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="reviewId")
	private int reviewId;
	
	@Column(name="productCode")
	private String productCode;
	
	@Column(name="rating")
	private float rating;
	
	@Column(name="heading")
	private String heading;
	
	@Column(name="review")
	private String review;
	
	@Column(name="approval", columnDefinition="varchar(400) default 'no'")
	private String approval;

	/**
	 * Default Constructor
	 */
	public Review() {}

	/**
	 * @return the reviewId
	 */
	public int getReviewId() {
		return reviewId;
	}

	/**
	 * @param reviewId the reviewId to set
	 */
	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	/**
	 * @return the productCode
	 */
	public String getProductCode() {
		return productCode;
	}

	/**
	 * @param productCode the productCode to set
	 */
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	/**
	 * @return the rating
	 */
	public float getRating() {
		return rating;
	}

	/**
	 * @param rating the rating to set
	 */
	public void setRating(float rating) {
		this.rating = rating;
	}

	/**
	 * @return the heading
	 */
	public String getHeading() {
		return heading;
	}

	/**
	 * @param heading the heading to set
	 */
	public void setHeading(String heading) {
		this.heading = heading;
	}

	/**
	 * @return the review
	 */
	public String getReview() {
		return review;
	}

	/**
	 * @param review the review to set
	 */
	public void setReview(String review) {
		this.review = review;
	}

	/**
	 * @return the approval
	 */
	public String getApproval() {
		return approval;
	}

	/**
	 * @param approval the approval to set
	 */
	public void setApproval(String approval) {
		this.approval = approval;
	}
	
	

}
