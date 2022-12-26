Exit Test Assignment

* Develop a product community website where a customer can visit, register themselves, browse products, raise for review, post reviews.
* This assignment has Two applications
   1. Frontend Application
   2. Backend Application

Backend Application:

  * This application is REST API no UI.
  * This application is developed in Java with the help of spring boot.
  * It works as backend that interact with database.

Database:

  * Database use for this application is MySQL.
  * Database Name- community
  * There are three tables in Community Database-
     1. Product(code(key), brand, name, avgReview, noOfRating, approve)
     2. Review(reviewId(key), productCode,heading, review,rating,approve)
     3. User(email(key), firstname, lastname, password)

Start Application:

* Run this application as Java Application
* This application is hosted on localhost at port number 8082.
* There are two types of controllers in this application:
   1. For Normal User API Application- 
       http://localhost:8082/api/v1/user/
   2. For Admin User API Application-
       http://localhost:8082/api/v1/admin/ 
