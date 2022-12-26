package com.nagarro.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.community.dao.UserDao;
import com.nagarro.community.pojo.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao dao;
	
	public User createUser(User user) {
		return dao.save(user);
	}

	public void deleteUser(String email) {
		dao.deleteById(email);
	}
	
	public void updateUser(User user) {
		dao.save(user);
	}

	public User getUserById(String email) {
		
		return dao.findById(email).get();
	}

	public List<User> getUser() {
		
		return dao.findAll();
	}

	
}
