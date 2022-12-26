/**
 * 
 */
package com.nagarro.community.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.community.pojo.Product;

/**
 * @author kritikasingh02
 *
 */
@Repository
public interface ProductDao extends JpaRepository<Product,String>{
    
}
