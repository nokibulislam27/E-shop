# ShopNow - E-commerce Store

**Live Link:** [ShopNow](https://lit-lounge-store.vercel.app)    

ShopNow is an online product-selling platform developed using the MERN stack. It includes features like user authentication, role-based dashboards, product management, and a fully responsive design.

---

## Features

### General Features
- **User Authentication:**  
  - Firebase authentication for email/password and Google login.
  - Password validation ensures strong and secure passwords.
- **JWT-based Authorization:**  
  - Protects private API routes and ensures secure access based on user roles.
- **Responsive Design:**  
  - Optimized for mobile, tablet, and desktop screens.

### User Roles and Permissions
1. **Buyer**  
   - Browse and purchase products.  
   - Add products to wishlist and cart.  
   - Cannot access seller or admin features.

2. **Seller**  
   - Manage products via their dashboard.  
   - Add, edit, or delete their own products.  

3. **Admin**  
   - Manage all users and roles via the admin dashboard.  
   - Promote buyers to sellers or delete users.  
   - Cannot self-register; must be added by another admin.

---

## Pages and Functionality

1. **Home Page**  
   - A beautifully designed page with six sections:  
     - Hero section  
     - Featured products  
     - Testimonials  
     - Categories  
     - FAQs  
     - Contact info  

2. **Products Page**  
   - Displays all products with filtering, sorting, and search options:  
     - Search by name  
     - Sort by price (ascending/descending)  
     - Filter by category and brand  

3. **Product Details Page**  
   - Detailed information for each product.

4. **About Page**  
   - Describes the application and its purpose.

5. **Contact Page**  
   - Includes a contact form with fields for name, email, and message.

### Buyer Features
- Add products to a wishlist or cart.  
- Complete purchases.  

### Seller Features
- A dedicated dashboard to:  
  - Add new products.  
  - Edit or delete their listed products.  

### Admin Features
- View all registered users.  
- Change user roles (e.g., promote a buyer to a seller).  
- Delete users.  

---

## Technology Stack

### Front-End
- React.js  
- TailwindCSS for styling  
- Swiper.js for interactive sliders  

### Back-End
- Node.js with Express.js  
- MongoDB as the database  
- Firebase for authentication  
- JWT for secure route protection  

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js  
- MongoDB  
- Git  

### Steps to Run Locally

2. **Install Dependencies:**  
   Navigate to each directory and run:  
   ```bash
   npm install
   ```

3. **Set Environment Variables:**  
   Create a `.env` file in both the client and server directories with the required configuration:  
   - **Client:**  
     - `VITE_SERVER_URL`  
   - **Server:**  
     - `MONGO_URI`  
     - `JWT_SECRET`  
     - `FIREBASE_API_KEY`  
     - `FIREBASE_AUTH_DOMAIN`  
     - `FIREBASE_PROJECT_ID`  
     - `FIREBASE_STORAGE_BUCKET`  
     - `FIREBASE_MESSAGING_SENDER_ID`  
     - `FIREBASE_APP_ID`  

4. **Run the Server:**  
   ```bash
   npm start
   ```

5. **Run the Client:**  
   ```bash
   npm run dev
   ```

6. **Access the Application:**  
   Open your browser and go to `http://localhost:3001`.

---

## Credentials for Testing

### Buyer Account  
**Email:** customer@litlounge.com  
**Password:** Customer@9876  

### Seller Account  
**Email:** seller@litlounge.com  
**Password:** Seller@5678  

### Admin Account  
**Email:** admin@litlounge.com  
**Password:** Admin@1234  