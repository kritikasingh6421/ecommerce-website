/**
 * 
 */
package com.nagarro.community.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.community.pojo.User;

/**
 * @author kritikasingh02
 *
 */
@Repository
public interface UserDao extends JpaRepository<User, String>{

}
