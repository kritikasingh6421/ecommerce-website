# FrontendApplication

* This is application is work as a frontend for community product webpage. 
* This is develop on Angular version 13.3.6.
* This webpage has two types of User:
  1. Normal User- This user does not has any special privilege.
  2. Admin User - This user has special privilege and special email id to login.
* This application has main module 'App' and it has two sub-moudules:
  1. User Module 
  2. Admin Module

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Steps to use application
  
  * Run "ng serve -o" on terminal to start the application on "http://localhost:4200/"
  * After this, User can login and Register according to their choice
  * Only logged in user can use further functionalities.
  * If user is Admin then:
    1. Admin can login with special credentials
      * email id for admin - admin@gmail.com
    2. After successfully login he can see all new Reviews 
    3. Admin has a right to accept or reject all new reviews.
    4. Only approved reviews are visible to frontstore.

  * If user is not Admin then: 
    1. If user does not has account then he/she can register.
    2. If user alreay has account then he/she can login with their credentials
    3. After successfully login user can see search bar to search product by their name, brand and code. 
    4. For search, user can use one or more attribute as per their choice.
    5. User can filter the searched list according to brand and rating.
    6. User can post review on product and can also watch previous approved reviews.
    7. User can ask for review of product.




