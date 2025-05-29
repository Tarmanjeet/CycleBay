# Circular Economy Marketplace

A MERN stack-powered web application that promotes sustainability through a peer-to-peer marketplace for refurbished, second-hand, or upcycled goods. Users can list, browse, and trade eco-friendly items, encouraging the reuse and recycling of products.


## ✨ Features

### Frontend (React.js)
- Landing Page (Public, no auth required)
- Authentication Flow: Signup, Login, Forgot Password
- Responsive Design with consistent theming
- Form Validation + Loading/Error States
- Route Protection for private pages
- Bookmarks/Favorites functionality
- Advanced Filters (category, price, tags)
- Sort Options (price, date, rating)
- Dark Mode toggle
- Multi-step Forms for item listing & checkout
- Suggestions & Related Listings
- Notifications
- User Profile Page
- Chat System with seller

### Backend (Node.js + Express.js + MongoDB)
- REST API with full CRUD operations
- Modular Routing
- JWT Authentication with bcrypt password hashing
- Comprehensive Middleware (auth, error handling, async wrapper)
- Backend validation using express-validator
- Image uploads via Multer 
- MongoDB schemas
- Environment configuration via .env
- Optional real-time features with Socket.io

## 🛠 Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based token system, bcrypt
- **Image Handling**: Multer
- **Version Control**: GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation
- Git

### Local Setup

1. **Fork the Repository**
   
   Click the "Fork" button at the top right of this repository to create your own copy.

2. **Clone Your Fork**
   ```
   git clone https://github.com/your-username/CycleBay.git
   
   cd CycleBay
   ```

4. **Backend Setup**
   ```
   cd backend
   
   npm install

   nodemon index.js
   ```

5. **Frontend Setup**
   
   Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   
   npm install
   
   npm run dev
   ```


**Let's build a more sustainable future together! 🌍♻️**
