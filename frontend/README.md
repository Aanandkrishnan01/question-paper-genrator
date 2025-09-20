# Question Paper Generator

A full-stack web application for generating customized question papers with authentication, secure access, and PDF export functionality.

---

## 🚀 Core Features

### 📄 Question Paper Generation
- Create customized question papers with **Part A (2-mark)** and **Part B (10-mark)** questions  
- **PDF generation** with proper formatting and structure  
- Dynamic question selection based on subject and marks criteria  

### 🗄️ Database Integration
- **MongoDB Atlas** for persistent data storage  
- Questions stored with subject, text, and marks attributes  
- Efficient query system for retrieving appropriate questions  

### 🔑 User Authentication System
- **JWT-based authentication** for secure access  
- Registration and login functionality  
- Token stored in `localStorage` for persistent sessions  
- **Bcrypt** password hashing for security  

### 🔒 Protected Routes
- All backend API endpoints protected with **auth middleware**  
- Frontend routes redirect unauthenticated users to the login page  
- API calls include authentication tokens in request headers  

### 🎨 UI Experience
- **3-second intro animation** on application load  
- Responsive design with modern styling  
- Intuitive form controls for question paper customization  

---

## 🏗️ Architecture

### Backend
- **Express.js** server with RESTful API endpoints  
- Authentication middleware for route protection  
- MongoDB connection with **Mongoose schemas**  
- JWT verification for secure API access  

### Frontend
- **React** with component-based architecture  
- **React Router** for navigation and protected routes  
- **Framer Motion** for animations  
- Authentication state management across components  

---

## 🔐 Security Features
- Password hashing with **bcrypt**  
- **JWT token authentication**  
- Protected API endpoints  
- Secure routing system  
- Authentication token verification  

---

## 📂 Project Structure

### Key Implementation Details

#### 🔑 Authentication Flow
1. User registers/logs in to receive a **JWT token**  
2. Token is stored in `localStorage`  
3. Token included in all API requests  
4. Server validates token before processing requests  

#### 📄 Question Paper Generation Process
1. Select subject and configure marks distribution  
2. Application fetches appropriate questions from the database  
3. Generated as a **downloadable PDF** with proper formatting  

#### 🧑‍💻 User Experience
- Intro animation welcomes users  
- Protected content ensures security  
- Intuitive navigation with login/logout functionality  

---

## ⚡ Tech Stack
- **Frontend:** React, React Router, Framer Motion  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas with Mongoose  
- **Authentication:** JWT, bcrypt  
- **Other:** PDF generation, RESTful API  

---
