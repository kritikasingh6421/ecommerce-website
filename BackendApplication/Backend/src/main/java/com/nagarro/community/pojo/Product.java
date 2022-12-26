package com.nagarro.community.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

/**
 * Product is class which allow an application to initialize Product attributes
 * during new object creation for Product.
 * 
 * @author kritikasingh02
 *
 */
@Entity
@Table(name="Product")
public class Product {

	@Id
	@Column(name="code")
	private String code;
	
	@Column(name="brand")
	private String brand;

	@Column(name="name")
	private String name;
	
	@Column(name="avgRating")
	private float avgRating;
	
	@Column(name="noOfReviews")
	private int noOfReviews;
	
	@Column(name="approval", columnDefinition="varchar(400) default 'no'")
	private String approval;
		
	/**
	 * Default Constructor
	 */
	public Product() {}
	
	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the brand
	 */
	public String getBrand() {
		return brand;
	}

	/**
	 * @param brand the brand to set
	 */
	public void setBrand(String brand) {
		this.brand = brand;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the avgRating
	 */
	public float getAvgRating() {
		return avgRating;
	}

	/**
	 * @param avgRating the avgRating to set
	 */
	public void setAvgRating(float avgRating) {
		this.avgRating = avgRating;
	}

	/**
	 * @return the noOfReviews
	 */
	public int getNoOfReviews() {
		return noOfReviews;
	}

	/**
	 * @param noOfReviews the noOfReviews to set
	 */
	public void setNoOfReviews(int noOfReviews) {
		this.noOfReviews = noOfReviews;
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
