/**
 * 
 */
package com.nagarro.community.service;

import java.util.List;

import com.nagarro.community.pojo.User;

/**
 * @author kritikasingh02
 *
 */
public interface UserService {

	public User createUser(User user);
	
	public void deleteUser(String email);
	
	public void updateUser(User user);
	
	public User getUserById(String email);
	
	public List<User> getUser();
}
