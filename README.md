# vetmedBackend

# Node.js Backend Documentation

## Introduction

- This Project follows Model-View-Controller (MVC) pattern.

### Here's a breakdown of how the folders align with the MVC pattern:

- **Controller folder**: This folder contains the controller files. It
  handle the logic for processing requests, interacting with models, and preparing the data to be sent back to the client.
- **Model folder**: This folder contain the model files. Models represent the data structures or entities of your application.
- **Routes folder:**: This folder contain the model files. Models represent the data structures or entities of your application. The routes folder contains the route files, which define the endpoints and their associated controllers. Routes handle the incoming requests and direct them to the appropriate controller method based on the URL and HTTP method. They serve as the entry point for requests and establish the mapping between URLs and controller actions.

# Installation and Setup

To set up the backend locally, follow these steps:

1. **Clone the repository**
   `git clone <repository-url>`

2. **Install dependencies**
   Navigate to the project root directory and run the following command to install the required dependencies:
   `npm install`
   This will install all the dependencies listed in the `package.json` file.

3. **Configure environment variables**
   To configure environment variables when the `.env` file is located in the config folder, you can follow these steps:

- **Create the .env file**
  Create a file named .env in the config folder of your project. create a folder named `config` and inside it create your `.env` file.
- **Define environment variables**
  Inside the `.env` file, define the necessary environment variables. Here's an example:<br>
  `MONGO_URL=<your-database-connection-string>`<br>
  `JWT_SECRET=<your-jwt-secret-key><br>`
  `PORT = 4000`<br>
  `JWT_EXPIRES_IN = 5d`<br>
  `JWT_COOKIE_EXPIRES_IN = 5`<br>
  `SMPT_SERVICE = gmail`<br>
  `SMPT_MAIL=vetmedmantest@gmail.com`<br>
  `SMPT_PASSWORD =<password>`<br>
  `SMPT_HOST=smtp.gmail.com`<br>
  `FRONTEND_URL = "http://localhost:5173"`<br>

4. **Start the backend server**
   To start the backend server in development mode with automatic restart on file changes, run the following command:
   `npm run dev`

---

# Directory Structure

```
 -backend
     /controllers
         | - articleController.js
         | - authController.js
         | - bannerController.js
         | - cartController.js
         | - categoryController.js
         | - errorController.js
         | - handleFactory.js
         | - orderController.js
         | - productController.js
         | - reviewController.js
         | - rfqController.js
         | - searchQueryController.js
         | - subcategoryController.js
         | - testimonialsController.js
         | - userController.js
     /middleware
         | - error-handler.js
     /models
         | - address.js
         | - cartItemModel.js
         | - orderModel.js
         | - searchQueryModel.js
         | - userModel.js
         | - articleModel.js
         | - categoryModel.js
         | - reviewModel.js
         | - subCategoryModel.js
         | - bannerModel.js
         | - myProductModel.js
         | - rfqModel.js
         | - testimonialModel.js
     /routes
         | - adminRoute.js
         | - categoryRoutes.js
         | - orderRoutes.js
         | - searchQueryRoutes.js
         | - apiRoute.js
         | - editorRoute.js
         | - productsRoute.js
         | - userRoutes.js
         | - articleRoute.js
         | - healthCheckRoutes.js
         | - reviewRoutes.js
         | - varietyRoutes.js
         | - cartRoutes.js
         | - homeRoute.js
         | - rfqRoutes.js
     /utils
         | - apiFeatures.js
         | - appError.js
         | - catchAsyncError.js
         | - logger.js
         | - sendEmail.js
     .gitignore
     .env
      app.js
      server.js
-package.json
-package-lock.json
```

# Models

### 1. userModel.js

The userModel.js file contains the definition of the User model, representing the user data structure in your application. It provides the schema and methods for working with user data in the database.

- Schema Field
  `name`, `email`,`password`, `role`, `createdAt`, `resetPasswordToken` -Token used for password reset., `resetPasswordExpire` - Expiration date for the reset password token.
  **Hooks** \* `pre("save")` - This hook is executed before saving the user to
  the database. It checks if the password field is modified and
  hashes the password using bcrypt if it is.
- **Methods**

  - `getJWTToken()`: - his method generates and returns a JSON Web
    Token (JWT) for the user. The JWT includes the user's ID as the payload.
  - `comparePassword(enteredPassword)` - This method compares the entered password with the stored hashed password and returns a boolean indicating if they match.

  - `getResetPasswordToken` - This method generates a random token for password reset, hashes it, and adds it to the resetPasswordToken field. It also sets the expiration date for the token.

### 2.Product Model

The Product model represents a product in the application. It defines the schema for storing product-related information in the database.

**Note**:- Go to product Model to see all the entities. Here lrt's discuss some important one

```
  ratings:{
        type:Number,
        default:0
    },

//This is for whole ratings of a single product.
e.g - if 2 user added rating for a single product then ratings will show the avg of 2 user's rating.
```

```
 reviews:[
        {
            user:{
                type:ObjectId,  // ObjectId (reference to "User" collection, required)
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
            },
            comment:{
                type:String,
            }

        }
    ],

// This is to include the review of a single user for a single product
// the rating in review is for a single user.
```

### 3.OrderModel

Schema Fields

- shippingInfo: The shipping information for the order.

  - Fields:
    - `fname`: The first name of the shipping address.
      - Type: String
      - Required field
    - `lname`: The last name of the shipping address.
      - Type: String
      - Required field
    - `address`: The address for shipping.
      - Type: String
      - Required field
    - `OptionalAddress`: Optional additional address information.
      - Type: String
    - `farmAddress`: Farm address.
      - Type: String
    - `city`: The city for shipping.
      - Type: String
      - Required field
    - `state`: The state for shipping.
      - Type: String
      - Required field
    - `country`: The country for shipping.
      - Type: String
      - Required field
    - `pinCode`: The PIN code for shipping.
      - Type: Number
      - Required field
    - `phoneNo`: The phone number for shipping.
      - Type: Number
      - Required field

- billingInfo: The billing information for the order. It has the same structure as the `shippingInfo` field.

- orderItems: The items included in the order.

  - Type: Array of objects
  - Fields:
    - `name`: The name of the ordered item.
      - Type: String
    - `quantity`: The quantity of the ordered item.
      - Type: Number
      - Required field
    - `image`: The image associated with the ordered item.
      - Type: String
      - Required field
    - `product`: The reference to the "Product" collection representing the ordered product.
      - Type: ObjectId
      - Reference: "Product" collection
      - Required field
    - `varieties`: Array of strings representing the varieties of the ordered product.

- user: The reference to the "User" collection representing the user who placed the order.

  - Type: ObjectId
  - Reference: "User" collection
  - Required field

- orderedAt: The timestamp indicating when the order was placed.

  - Type: Date
  - Required field

- orderStatus: The status of the order.

  - Type: String
  - Required field
  - Default: "Processing"

- deliveredAt: The timestamp indicating when the order was delivered.

  - Type: Date

- createdAt: The timestamp indicating when the order was created.

  - Type: Date
  - Default: Current timestamp when the order is created.

### Export

The Order model is exported as a Mongoose model named "Order" for use in other parts of the application.

---

# Controllers

## orderController.js

1.  `newOrder` function: This function is used to create a new order.

    - It extracts the required information from the request body, such as `shippingInfo`, `orderItems`, and `billingInfo`.
    - It creates a new order using the `Order.create` method, passing the extracted information along with the current date and the user ID from the request.
    - It sends an email to the user with the order details using the `sendEmail` function.
    - Finally, it sends a JSON response with the created order.

2.  `getSingleOrder` function: This function retrieves a single order by its ID.

    - It uses the `Order.findById` method to find the order with the specified ID and populates the `user` field with the corresponding user's `name` and `email`.
    - If the order is not found, it returns an error.
    - Otherwise, it sends a JSON response with the retrieved order.

3.  `myOrders` function: This function retrieves all orders for the logged-in user.

    - It uses the `Order.find` method to find orders where the `user` field matches the ID of the logged-in user.
    - It sends a JSON response with the retrieved orders.

4.  `getAllOrders` function: This function retrieves all orders (for admin use).

    - It uses the `Order.find` method to find all orders.
    - It calculates the `totalAmount` by summing up the `totalPrice` of each order.
    - It sends a JSON response with the total amount and the retrieved orders.

5.  `updateOrderStatus` function: This function updates the status of an order (for admin use).

    - It uses the `Order.findById` method to find the order with the specified ID.
    - If the order is not found, it returns an error.
    - It checks if the order status is already "Delivered" and returns an error if it is.
    - It updates the stock of each product in the order by calling the `updateStock` function.
    - It updates the order status based on the `status` provided in the request body and sets the `deliveredAt` field if the status is "Delivered".
    - It saves the updated order and sends a JSON response.

6.  `updateStock` function: This function updates the stock of a product.

    - It takes the product ID and quantity as parameters.
    - It retrieves the product using the `Product.findById` method.
    - It subtracts the quantity from the product's `Stock` property and saves the product.

7.  `deleteOrder` function: This function deletes an order (for admin use).

    - It uses the `Order.findByIdAndRemove` method to find and remove the order with the specified ID.
    - If the order is not found, it returns an error.
    - If the order is found, it sends a JSON response indicating success.

## ProductController.js

1.  `createProduct`: This function is used to create a new product. It receives the product data from the request body, sets the `user` field to the current user's ID, creates a new product using the `Product` model, and returns the created product as a JSON response. If an error occurs, it calls the `next` function with the error.

2.  `getProductDetails`: This function retrieves the details of a single product. It takes the product ID from the request parameters, finds the product using the `Product` model, and returns the product details as a JSON response. If the product is not found, it calls the `next` function with an error.

3.  `updateProduct`: This function is used to update a product. It first finds the product using the provided ID, then updates the product with the new data from the request body using the `Product.findByIdAndUpdate` method. It returns the updated product as a JSON response. If the product is not found, it calls the `next` function with an error.

4.  `deleteProduct`: This function deletes a product. It finds the product using the provided ID and removes it using the `Product.findByIdAndRemove` method. It returns a JSON response indicating the success of the deletion. If the product is not found, it calls the `next` function with an error.

5.  `showAllProducts`: This function retrieves all products with optional filters and pagination. It allows filtering by `keyword`, `animal`, `treatment`, `dailyEssential`, and `medicalCare`. The filters are applied to the `Product.find` query to retrieve the matching products. The results are paginated using the `page` and `pageSize` parameters. The function returns a JSON response with the count of total products, the current page, the number of pages, and the retrieved products. If an error occurs, it calls the `next` function with the error.

6.  `createProductReview`: This function allows users to create or update a review for a product. It receives the review data from the request body, including the rating, comment, and product ID. It checks if the user has already reviewed the product and updates the existing review or adds a new review accordingly. It calculates the average rating for the product based on all reviews and updates the `ratings`, `numOfReviews`, and `reviews` fields of the product. It returns the created or updated review as a JSON response.

7.  `getProductReviews`: This function retrieves all reviews for a product. It takes the product ID from the request query parameters, finds the product using the `Product` model, and returns the reviews as a JSON response. If the product is not found, it calls the `next` function with an error.

8.  `deleteReview`: This function allows users to delete their review for a product. It takes the product ID and review ID from the request query parameters. It finds the product using the product ID, filters out the specified review from the product's `reviews` array, recalculates the average rating and number of reviews, and updates the product using `Product.findByIdAndUpdate`. It returns a JSON response indicating the success of the deletion.

9.  `getAdminProducts`: This function is specifically for administrators. It retrieves all products using the `Product.find` method and returns them as a JSON response.

## userController.js

1.  Importing required modules and files:

    - `ErrorHandler`: A custom error handling utility.
    - `catchAsyncErrors`: Middleware function to catch asynchronous errors.
    - `User`: The user model for interacting with the database.
    - `sendToken`: Utility function to send a JWT token as a response.
    - `sendEmail`: Utility function to send emails.
    - `crypto`: Node.js crypto module for generating password reset tokens.
    - `logger`: Custom logger utility for logging messages.

2.  Registering a User (`registerUser` function):

    - Create a new user in the database using the provided name, email, and password.
    - Send a JWT token as a response.

3.  Logging in a User (`loginUser` function):

    - Check if both email and password are provided.
    - Find the user in the database based on the provided email.
    - Compare the provided password with the user's stored password.
    - Send a JWT token as a response if the credentials are valid.

4.  Logging out a User (`logout` function):

    - Clear the JWT token cookie in the response.
    - Send a success message.

5.  Forgot Password (`forgotPassword` function):

    - Find the user based on the provided email.
    - Generate a password reset token and set an expiry time for it.
    - Save the user with the reset token and expiry time.
    - Send a password reset email to the user with the reset token URL.

6.  Reset Password (`resetPassword` function):

    - Verify the reset token from the request parameters.
    - Find the user with a valid reset token and not expired.
    - Update the user's password with the new password from the request body.
    - Clear the reset token and expiry time.
    - Send a JWT token as a response.

7.  Get User Details (`getUserDetails` function):

    - Find the user details based on the user ID from the JWT token.
    - Send the user details as a response.

8.  Update Password (`updatePassword` function):

    - Verify the user's current password.
    - Check if the new password matches the confirmation password.
    - Update the user's password with the new password.
    - Send a JWT token as a response.

9.  Update User Profile (`updateProfile` function):

    - Update the user's name and email based on the request body.
    - Send a success message and the updated user profile.

10. Get All Users (Admin) (`getAllUser` function):

    - Fetch all users from the database.
    - Send the list of users as a response.

11. Get Single User (Admin) (`getSingleUser` function):

    - Find a user based on the provided user ID.
    - Send the user details as a response.

12. Update User Role (Admin) (`updateUserRole` function):

    - Update the user's name, email, and role based on the request body.
    - Send a success message as a response.

13. Delete User (Admin) (`deleteUser` function):

    - Find a user based on the provided user ID.
    - Remove the user from the database.
    - Send a success message as a response.

---

# database-Connection/database.js

1.  Importing required modules:

    - `mongoose`: The Mongoose library for MongoDB interactions.

2.  Configuring Mongoose settings:

    - `mongoose.set("strictQuery", false)`: This line sets the `strictQuery` option to `false`, which allows Mongoose to execute queries even if they contain fields not defined in the schema.

3.  Connect to the MongoDB database:

    - The `connectDatabase` function establishes a connection to the MongoDB database using the `mongoose.connect` method.
    - It uses the `process.env.MONGO_URL` environment variable to specify the URL of the MongoDB database.
    - The `useNewUrlParser` and `useUnifiedTopology` options are passed to the `mongoose.connect` method for proper configuration.
    - If the connection is successful, the message "connected..." is logged to the console.

4.  Exporting the `connectDatabase` function to be used by other parts of the application.

# middleware

- ### auth.js

1.  Importing required modules:

    - `catchAsyncErrors`: A middleware function that wraps asynchronous route handlers and catches any errors that occur.
    - `ErrorHandler`: A custom error handling utility.
    - `jwt`: The JSON Web Token library for working with tokens.
    - `User`: The User model representing the user collection in the database.

2.  Middleware function for user authentication (`isAuthenticatedUser`):

    - This middleware function is responsible for authenticating the user based on the provided token.
    - It expects the token to be stored in the `token` field of the request cookies.
    - If no token is found, it returns an authentication error.
    - If a token is found, it verifies the token using the `jwt.verify` method and the `process.env.JWT_SECRET` environment variable.
    - If the token is valid, it retrieves the user information from the database based on the decoded token data and attaches it to the `req.user` object.
    - Finally, it calls the `next` function to pass control to the next middleware or route handler.

3.  Middleware function for role authorization (`authorizeRoles`):

    - This middleware function takes a variable number of role parameters (`...roles`) that are allowed to access a specific resource.
    - It returns another middleware function that will be used as a route handler.
    - The returned middleware function checks if the user's role (`req.user.role`) is included in the provided roles.
    - If the user's role is not included, it returns a forbidden error (`403`).
    - If the user's role is allowed, it calls the `next` function to pass control to the next middleware or route handler.

# Routes

# userRoutes.js

1.  `/register` - POST request to register a new user. Calls the `registerUser` controller function.
2.  `/login` - POST request to log in a user. Calls the `loginUser` controller function.
3.  `/password/forgot` - POST request to initiate the password reset process. Calls the `forgotPassword` controller function.
4.  `/password/reset/:token` - PUT request to reset the password using a reset token. Calls the `resetPassword` controller function.
5.  `/me` - GET request to fetch the current user's details. Requires authentication (`isAuthenticatedUser` middleware). Calls the `getUserDetails` controller function.
6.  `/password/update` - PUT request to update the user's password. Requires authentication. Calls the `updatePassword` controller function.
7.  `/me/update` - PUT request to update the user's profile. Requires authentication. Calls the `updateProfile` controller function.
8.  `/admin/users` - GET request to fetch all users (admin access required). Requires authentication and authorization with the role "admin". Calls the `getAllUser` controller function.
9.  `/admin/user/:id` - GET, PUT, DELETE requests for a single user (admin access required). Requires authentication and authorization with the role "admin". Calls the `getSingleUser`, `updateUserRole`, and `deleteUser` controller functions respectively.
10. `/logout` - GET request to log out the user. Calls the `logout` controller function.

# orderRoutes.js

1.  `POST /order/new` - Creates a new order. Requires authentication (`isAuthenticatedUser` middleware). Calls the `newOrder` controller function.
2.  `GET /order/:id` - Retrieves details of a single order by its ID. Requires authentication (`isAuthenticatedUser` middleware). Calls the `getSingleOrder` controller function.
3.  `GET /myorders` - Retrieves all orders placed by the currently authenticated user. Requires authentication (`isAuthenticatedUser` middleware). Calls the `myOrders` controller function.
4.  `GET /admin/orders` - Retrieves all orders. Requires authentication and authorization with the role "admin" (`isAuthenticatedUser` and `authorizeRoles` middlewares). Calls the `getAllOrders` controller function.
5.  `PUT /admin/order/:id` - Updates the status of an order by its ID. Requires authentication and authorization with the role "admin". Calls the `updateOrderStatus` controller function.
6.  `DELETE /admin/order/:id` - Deletes an order by its ID. Requires authentication and authorization with the role "admin". Calls the `deleteOrder` controller function.

# productsRoutes.js

1.  `POST /product/create` - Creates a new product. Requires authentication and authorization with the role "admin" (`isAuthenticatedUser` and `authorizeRoles` middlewares). Calls the `createProduct` controller function.
2.  `GET /products` - Retrieves all products. Does not require authentication. Calls the `showAllProducts` controller function.
3.  `GET /product/:id` - Retrieves details of a single product by its ID. Does not require authentication. Calls the `getProductDetails` controller function.
4.  `PUT /admin/product/:id` - Updates a product by its ID. Requires authentication and authorization with the role "admin". Calls the `updateProduct` controller function.
5.  `DELETE /admin/product/:id` - Deletes a product by its ID. Requires authentication and authorization with the role "admin". Calls the `deleteProduct` controller function.
6.  `PUT /review` - Creates a new review for a product. Requires authentication. Calls the `createProductReview` controller function.
7.  `GET /review` - Retrieves all reviews for a product. Does not require authentication. Calls the `getProductReviews` controller function.
8.  `DELETE /review` - Deletes a review. Requires authentication. Calls the `deleteReview` controller function.
9.  `GET /admin/products` - Retrieves all products for the admin. Requires authentication and authorization with the role "admin". Calls the `getAdminProducts` controller function.

# utils

- ### sendEmail.js

1. The `sendEmail` function is defined with a single parameter `options`, which is an object containing the email details such as `email`, `subject`, `message`, and `html` (optional).
2. Inside the function, a transporter is created using `nodemailer.createTransport()`. The transporter configuration includes the SMTP host, port, service, and authentication credentials (username and password) retrieved from environment variables.
3. The `mailOptions` object is created, which contains the email details such as the sender, recipient, subject, text body, and HTML body.
4. The `transporter.sendMail()` method is called with the `mailOptions` to send the email asynchronously.

- ### catchAsyncError.js
  This higher-order function is useful for handling asynchronous operations in route handlers and ensuring any errors are properly caught and forwarded to the error-handling middleware.

1.  The higher-order function takes `theFunc` as an argument.
2.  It returns another middleware function with the signature `(req, res, next)`.
3.  Inside the returned middleware function, `theFunc(req, res, next)` is called and executed.
4.  The return value of `theFunc` is wrapped in a `Promise.resolve()` call to ensure it resolves to a promise.
5.  The promise is then chained with `.catch(next)` to handle any errors that occur during the execution of `theFunc`.
6.  If an error occurs, the `next` function is called with the error as an argument, passing control to the next error-handling middleware.

- ### appError.js
  This error handling middleware allows you to handle specific types of errors and provide custom error messages and status codes in your Express application.

1.  The middleware function takes four parameters: `err`, `req`, `res`, and `next`.
2.  It checks if the `err` object has a `statusCode` property. If not, it sets it to `500` (Internal server error).
3.  It checks if the `err` object has a `message` property. If not, it sets it to `"Internal server error"`.
4.  The middleware then checks for specific types of errors and modifies the `err` object accordingly:
    - If the error is a MongoDB CastError, it creates a new `ErrorHandler` with a custom message and a `400` status code.
    - If the error is a Mongoose duplicate key error (code 11000), it creates a new `ErrorHandler` with a custom message and a `400` status code.
    - If the error is a JsonWebTokenError, it creates a new `ErrorHandler` with a custom message and a `400` status code.
    - If the error is a TokenExpiredError, it creates a new `ErrorHandler` with a custom message and a `400` status code.
5.  Finally, the middleware sends a JSON response with the appropriate status code and error message.

# app.js

- The Express application is created with `const app = express()`.
- Middleware and dependencies are imported:
  - `errorMiddleware` is imported from `'./middleware/error'`. This middleware handles error responses.
  - `cookieParser` is imported from `'cookie-parser'`. It parses cookie headers and populates `req.cookies` with the parsed cookies.
  - `dotenv` is imported to load environment variables from the "backend/config/config.env" file.
  - `cors` is imported to enable Cross-Origin Resource Sharing.
- Configuration is loaded with `dotenv.config({path:"backend/config/config.env"})`, which reads environment variables from the specified file.
- Middleware is added to the application:
  - `cors()` middleware is used to enable CORS.
  - `cookieParser()` middleware is added to parse cookies.
  - `express.json()` middleware is added to parse JSON request bodies.
- Route files are imported:
  - `userRoutes`, `animalTypeRoutes`, `treatmentTypeRoute`, `productsRoute`, `dailyEssentialRoutes`, `medicalCareRoute`, `orderRoutes`, and `varietyRoutes` are imported.
- Routes are mounted to the application using `app.use()`:
  - All routes from each route file are mounted under the "/api/v1" path.
- A wildcard route is added to handle any unmatched routes. It responds with a 404 status and an error message.
- The `errorMiddleware` is added as the last middleware to handle errors in the application.
- The application is exported as `app`.

# server.js

- The dotenv.config() function is called to load environment variables from the "backend/config/config.env" file.
- The `connectDatabase` function is called to establish a connection with the database.
- The `process.on("uncaughtException", ...)` event handler is set up to handle uncaught exceptions. If an uncaught exception occurs, the error message is logged, and the server is shut down by calling `process.exit(1)`.
- The `process.env.PORT` variable is used to determine the port on which the server will listen.
- The server is started by calling `app.listen(port, ...)`, and a message is logged to indicate that the server is running.
- The `process.on("unhandledRejection", ...)` event handler is set up to handle unhandled promise rejections. If an unhandled promise rejection occurs, the error message is logged, and the server is shut down by calling `server.close()` and then `process.exit(1)`.

---

# Important Notes for developers:

**there are some changes you have to do in code during development time to run it locally**

- app.js (development)

```
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','PUT','POST','OPTIONS']

}));
```

- app.js (production) -> as in azure portal cors is enabled and frontend url is added.

```
app.use(cors());
```

- jwtToken.js (development) -> `httpOnly: true`

```
const sendToken = (user,statusCode, res) =>{
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token,options).json({
        success:true,
        user,
        token,
    })
}
```

- jwtToken.js (production) -> comment httpOnly: true , and add
  - ```secure: true,
       sameSite: 'none'
    ```

```
  const sendToken = (user,statusCode, res) =>{
    const token = user.getJWTToken();


    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 *1000
        ),
       // httpOnly: true,
       secure: true,
       sameSite: 'none'
    };

    res.status(statusCode).cookie("token", token,options).json({
        success:true,
        user,
        token,
    })
 }
```

- controllers/userController.js (development)
  In `logout` function

```
exports.logout = catchAsyncErrors(async(req,res,nex)=>{

   res.cookie("token",null,{
       expires: new Date(Date.now()),
       httpOnly:true
   })

   res.status(200).json({
       success:true,
       message:" Logged Out",
   })
})
```

- controllers/userController.js (production)
  In `logout` function

```
exports.logout = catchAsyncErrors(async(req,res,nex)=>{

   res.cookie("token",null,{
      expires: new Date(Date.now()),
      // httpOnly: true,
      secure: true,
      sameSite: 'none'
   })

   res.status(200).json({
       success:true,
       message:" Logged Out",
   })
})
```
