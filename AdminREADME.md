# Admin Route Readme

This readme file provides an overview of the admin route in an Express.js application. The admin route is designed for managing various aspects of the application, such as users, orders, products, categories, and more. It is intended for use by administrators who have privileged access to these functionalities.

## Table of Contents

1. [Route Structure](#route-structure)
2. [Available Endpoints](#available-endpoints)
3. [Authentication](#authentication)
4. [Controllers](#controllers)

---

### Route Structure

The admin route is defined in the `adminRoute.js` file and includes the following key components:

- **Middleware**: The route uses the `authController.protect` middleware to ensure that only authenticated users with admin privileges can access these endpoints.

- **Endpoints**: The route defines multiple endpoints for different functionalities, each mapped to a specific controller method.

### Available Endpoints

Here's a list of available endpoints and their corresponding actions:

1. **POST /admin/login**

   - Action: Admin login
   - Controller: `authController.login`

2. **GET /admin/logout**

   - Action: Admin logout
   - Controller: `authController.logout`

3. **GET /admin/**

   - Action: Default admin route
   - Description: This endpoint serves as a placeholder and responds with "Hello."

4. **GET /admin/order**

   - Action: Get all orders
   - Controller: `orderController.getAllOrders`

5. **PATCH /admin/order/:id**

   - Action: Update order status
   - Controller: `orderController.updateOrderStatus`

6. **DELETE /admin/order/:id**

   - Action: Delete an order
   - Controller: `orderController.deleteOrder`

7. **GET /admin/user**

   - Action: Get all users
   - Controller: `userController.getAllUsers`

8. **PATCH /admin/user**

   - Action: Update a user
   - Controller: `userController.updateUser`

9. **DELETE /admin/user**
   - Action: Delete a user
   - Controller: `userController.deleteUser`

(Additional endpoints follow a similar pattern for categories, products, reviews, RFQs, subcategories, articles, banners, and testimonials.)

### Authentication

Authentication is a crucial aspect of the admin route. It relies on the `authController.protect` middleware to verify that users are authenticated. Additionally, the `authController.restrictTo("admin")` middleware restricts access to users with admin privileges.

### Controllers

The route uses various controller methods (e.g., `orderController`, `userController`, etc.) to handle specific functionalities. These controllers contain the logic for processing requests and sending responses.
Check Respective Controller for complete details.

### Note

To make someone admin or editor, go to the mongoDB and change the role to admin or editor of that user. Please make sure speeling is correct and all are lower case.

### Deployment

To deploy the latest changes simply push to the github repo vetmedmanproduction/VetmedmanDeployment, if there are any changes in Frontend, run `npm run build` first before pushing to the repo.
