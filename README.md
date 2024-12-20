# Coffee Shop Backend

A simple backend server for managing products using Express and MongoDB.

## Features
- RESTful API endpoints
- Add products with fields like name, description, price, category, stock, and imageUrl.
- MongoDB for data persistence.

## Setup Instructions

1. **Clone the Repository**

   `git clone https://github.com/yourusername/coffee-shop-backend2.git`

   `cd coffee-shop-backend2`

2. **Install Dependencies**

   `npm install`

3. **Setup Environment Variables**

   Create a `.env` file in the root directory and add your MongoDB URI like so:


4. **Start the Server**

`npm start`

The server will run at `http://localhost:3000`.


## API Endpoint Screenshots

### POST /products: Create a new product
![POST /products: Create a new product](assets/POST-products.jpg)

### GET /products: Get all products
![GET /products: Get all products](assets/GET-products.jpg)

### GET /products/:id: Get a single product by ID
![GET /products/:id: Get a single product by ID](assets/GET-id.jpg)

### PUT /products/:id: Update a product by ID
![PUT /products/:id: Update a product by ID](assets/PUT-productid.jpg)

### DELETE /products/:id: Delete a product by ID
![DELETE /products/:id: Delete a product by ID](assets/DELETE-productid.jpg)



____________________________________________________________________________

## AUTH Screenshots

### POST /auth/register: Register a new user
![POST /auth/register: Register a new user](assets/auth/POST-auth;register.jpg)

### POST /auth/login: Login a user
![POST /auth/login: Login a user](assets/auth/POST-auth;login.jpg)

### GET /protectedroute: Access a protected route (requires JWT authentication)
![GET /protectedroute: Access a protected route](assets/auth/GET-protectedroute.jpg)


________________________________________________________________________

## DAY3 Screenshots
### GET /users: Get All Users (Admin Only)  
![GET /users: Get All Users (Admin Only)](assets/day3/Get-AllUsers(Admin).jpg)  

---

### GET /users/:id: Get a Single User by ID  
![GET /users/:id: Get a Single User by ID](assets/day3/Get-SingleUserByID.jpg)  

---

### PUT /users/:id: Update a User by ID  
![PUT /users/:id: Update a User by ID](assets/day3/Update-UserByID.jpg)  

---

### DELETE /users/:id: Delete a User by ID (Admin Only)  
![DELETE /users/:id: Delete a User by ID (Admin Only)](assets/day3/Delete-UserByID.jpg)  

---

### GET /products: Get All Products or Filter by Category  
![GET /products: Get All Products or Filter by Category](assets/day3/Get-ByCategory.jpg)  

---

### GET /products/:id: Get a Single Product by ID  
![GET /products/:id: Get a Single Product by ID](assets/day3/Get-ProductByID.jpg)  

---

### PUT /products/:id: Update a Product by ID  
![PUT /products/:id: Update a Product by ID](assets/day3/Update-ProductByID.jpg)  

---

### DELETE /products/:id: Delete a Product by ID  
![DELETE /products/:id: Delete a Product by ID](assets/day3/Delete-ProductByID.jpg)  


## DAY 4 SCREEN SHOTS

### Create a Product with Image Upload:
![Post new product with image](assets/day4/Post-WithImage.jpg)

### Get All Products with Pagination and Filtering:
![Get filtered products](assets/day4/Get-Pagination.jpg)
