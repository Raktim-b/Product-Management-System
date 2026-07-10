# 🛒 Product Management System API

> A secure, role-based Product Management System built with **Node.js, Express.js, MongoDB, and EJS**, featuring JWT Authentication, MongoDB Aggregation Pipelines, Email Notifications, and complete CRUD operations for Users, Categories, Subcategories, and Products.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger)

---
#🛠 Tech Stack<

<p align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript,npm,git,github,vscode,postman&theme=light" />
</p>

---

# 📌 Project Overview

This project is a **Role-Based Product Management System** developed as a backend application using **Node.js**, **Express.js**, and **MongoDB**.

The system allows organizations to securely manage **Users, Categories, Subcategories, and Products** while enforcing role-based permissions.

It also includes:

- 🔐 JWT Authentication
- 📧 Automatic Email Notifications
- 📊 Dashboard Analytics
- ⚡ MongoDB Aggregation Pipelines
- 📄 Swagger API Documentation
- 🎨 EJS Template Engine

The project demonstrates backend architecture, authentication, authorization, database design, API development, and aggregation queries used in real-world applications.

---

# 🚀 Business Problem

Imagine a company that sells hundreds of products.

Without a centralized system:

- Employees can accidentally modify important product information.
- Anyone can add or remove products.
- Categories become disorganized.
- Managers cannot monitor product statistics.

This Product Management System solves these problems by introducing secure role-based access and centralized product management.

---

# 👥 User Roles

The application supports the following roles:

| Role | Permissions |
|------|-------------|
| 👑 Super Admin | Full access to the entire system |
| 👨‍💼 Admin | Manage Users and Products |
| 👤 User | Manage Products, Categories, and Subcategories |

---

# ✨ Key Features

## 🔐 Authentication

- JWT Authentication
- Secure Password Hashing using bcrypt
- Refresh Token Authentication
- Logout functionality
- Role Based Authorization

---

## 👤 User Management

The Super Admin can:

- Create Admin
- Create User
- Automatically generate passwords
- Send login credentials via Email

Admins can:

- View Users
- Edit Users
- Activate / Deactivate Users
- Soft Delete Users
- Recover Deleted Users

---

## 📦 Product Management

Users can:

- Create Products
- Update Products
- Delete Products
- View Product Details

Each Product belongs to

- Category
- Subcategory

Product Listing displays:

- Product Name
- Category Name
- Subcategory Name
- Price

---

## 🗂 Category Management

Users can

- Create Category
- Edit Category
- Delete Category

Category Listing displays

- Category Name
- Associated Subcategories

---

## 📁 Subcategory Management

Users can

- Create Subcategory
- Update Subcategory
- Delete Subcategory

Each Subcategory belongs to a Category.

---

## 📊 Dashboard

The Dashboard displays

- Total Products
- Total Categories
- Total Subcategories
- Products under each Category
- Products under each Subcategory

Dashboard statistics are generated using **MongoDB Aggregation Pipeline**.

---

# 📧 Email Notification

Whenever the Super Admin creates a new Admin or User

✔ Account is created

✔ Password is generated automatically

✔ Login Credentials are sent through Email

---

# 🏗 Database Design

Collections used:

- Users
- Roles
- Categories
- Subcategories
- Products

Relationships

```
Category
     │
     ├──────────────┐
     │              │
Subcategory      Product
     │              │
     └──────────────┘
```

---

# 🧠 MongoDB Aggregation

Aggregation Pipeline is used to

- Join Product → Category
- Join Product → Subcategory
- Dashboard Statistics
- Product Count
- Category Count
- Subcategory Count

---

# 🔐 Authentication Flow

```
Login
     │
     ▼
Access Token + Refresh Token
     │
     ▼
Protected Routes
     │
     ▼
Role Verification
     │
     ▼
API Access
```

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### API Documentation

- Swagger

### Template Engine

- EJS

### File Upload

- Multer

### Email

- Nodemailer

---

# 📂 Project Structure

```
ProductAPI
│
├── app
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── utils
│   └── validation
│
├── uploads
├── public
├── Postman
├── views
│
├── app.js
├── swagger.json
├── package.json
└── .env
```

---

# 🔑 API Modules

✅ Authentication

- Create Role
- Create Super Admin
- Login
- Refresh Token
- Logout

---

✅ User

- Create Admin
- Create User
- Get Users
- Update User
- Change Password
- Activate / Deactivate User
- Soft Delete User
- Recover User

---

✅ Category

- Create Category
- Get Categories
- Get Category by ID
- Update Category
- Delete Category

---

✅ Subcategory

- Create Subcategory
- Get Subcategories
- Get Subcategory by ID
- Update Subcategory
- Delete Subcategory

---

✅ Product

- Create Product
- Get Products
- Get Product by ID
- Update Product
- Delete Product

---

✅ Dashboard

- Dashboard Statistics
- Product Count
- Category Count
- Subcategory Count

---

# 📄 API Documentation

Swagger documentation is included.

```
http://localhost:4025/api-docs
```

---

# 📬 Postman Collection

The repository includes a ready-to-use Postman Collection.

Import:

```
Postman/ProductManagement_postman_collection.json
```

---

# ▶️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create

```
.env
```

Add

```env
PORT=4025

MONGO_URI=your_database_url

JWT_SECRET=your_secret

ADMIN_NAME=Super Admin

ADMIN_EMAIL=admin@gmail.com

ADMIN_PASSWORD=Admin@123
```

Start Server

```bash
npm run dev
```

---

# 💡 Skills Demonstrated

- REST API Development
- Authentication & Authorization
- JWT
- Refresh Token
- MongoDB Aggregation Pipeline
- MongoDB Relationships
- CRUD Operations
- MVC Architecture
- Swagger Documentation
- Email Integration
- File Upload
- Input Validation
- Soft Delete
- Role Based Access Control (RBAC)

---

# 👨‍💻 Author

**Raktim Bhattacharya**

Backend Developer

GitHub: https://github.com/Raktim-b



---
