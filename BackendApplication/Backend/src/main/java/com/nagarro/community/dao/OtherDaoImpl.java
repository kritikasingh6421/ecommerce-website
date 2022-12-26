/**
 * 
 */
package com.nagarro.community.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nagarro.community.pojo.Product;

/**
 * @author kritikasingh02
 *
 */
@Repository
public class OtherDaoImpl implements OtherDao {

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private ProductDao dao;

	/**
	 * return list of product references have given input keyword
	 * @param key
	 * @return
	 */
	@Override
	public List<Product> productSearch(String key) {
		Session session = entityManager.unwrap(Session.class);
		String parts[] = key.split(" ");
		List<Product> requiredProducts = new ArrayList<>();
		List<Product> products = dao.findAll();
		Iterator itr = products.iterator();
		while (itr.hasNext()) {
			Product p = (Product) itr.next();
			if (p.getApproval().equalsIgnoreCase("yes")) {
				boolean flag = false;
				for (String part : parts) {
					//System.out.println(part);
					if ((p.getBrand().equalsIgnoreCase(part)) || (p.getCode().equalsIgnoreCase(part))
							|| (p.getName().equalsIgnoreCase(part))) {
						// requiredProducts.add(p);
						// System.out.println("Product matched with search"+p.getName());
						flag = true;
					} else {
						flag = false;
						break;//
					}
				}
				if (flag) {
					requiredProducts.add(p);
				}
			}
		}
		return requiredProducts;
	}

	/**
	 * return list of product references containing given input values
	 * @param key
	 * @param brand
	 * @param rating
	 * @return
	 */
	public List<Product> productFilterByBrand(String key, String brand, int rating) {
		Session session = entityManager.unwrap(Session.class);
		List<Product> requiredProducts = new ArrayList<>();
		List<Product> products = productSearch(key);
		Iterator itr = products.iterator();
		while (itr.hasNext()) {
			Product p = (Product) itr.next();
			if ((p.getBrand().equalsIgnoreCase(brand)) && ((p.getAvgRating() <= rating))) {
				requiredProducts.add(p);
				//System.out.println("Product matched with search" + p.getName());
			}
		}
		return requiredProducts;
	}

}
