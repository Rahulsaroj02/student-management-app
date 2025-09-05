# 🧑‍🏫 **Student-Faculty-Admin Management System**

A full-stack web application built with the **MERN** stack that provides a robust, role-based portal for **students**, **faculty**, and **administrators**. The system features secure authentication, role-specific dashboards, and a streamlined user management workflow.

---
## 🌟 **Key Features**

* **Role-Based Authentication**: Users are assigned roles (student, faculty, or admin) upon registration.
* **Secure Authorization**: JWT (JSON Web Tokens) are used to protect routes and ensure users can only access their designated panels.
* **Admin Panel**: Admins can approve or reject new user registrations, view all approved users, and delete user accounts.
* **Faculty Panel**: Faculty members can view a list of all approved students and update their marks and attendance.
* **Student Panel**: Students can view their own profile, including their assigned marks and attendance.
* **Automatic Admin Seeding**: A default admin account is created automatically on the first server startup to simplify initial setup.

---
## 💻 **Tech Stack**

### **Frontend**
* **React**: A JavaScript library for building user interfaces.
* **React Router DOM**: For handling client-side routing.
* **Axios**: For making HTTP requests to the backend API.
* **Bootstrap**: For basic styling and responsive design.

### **Backend**
* **Node.js**: A JavaScript runtime environment.
* **Express.js**: A web framework for building RESTful APIs.
* **MongoDB**: A NoSQL database.
* **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **bcrypt.js**: For hashing and securing passwords.
* **jsonwebtoken**: For creating and verifying JWTs.
* **cors**: A Node.js middleware for enabling Cross-Origin Resource Sharing.
* **dotenv**: For managing environment variables.

---
## 🚀 **Getting Started**

Follow these steps to get a local copy of the project up and running.

### **Prerequisites**
* **Node.js** (v14.x or higher)
* **npm** (comes with Node.js)
* **MongoDB**: An instance of MongoDB (local or cloud-based like MongoDB Atlas).

### **Installation**
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO.git](https://github.com/YOUR_USERNAME/YOUR_REPO.git)
    cd YOUR_REPO
    ```

2.  **Install backend dependencies**:
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory with the following content:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key_for_jwt
    ```
    *Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_secret_key_for_jwt` with a long, random string.*

4.  **Start the backend server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5001`. On the first run, it will automatically seed an admin account.

5.  **Install frontend dependencies**:
    ```bash
    cd client  # Assuming your React app is in a 'client' folder
    npm install
    ```

6.  **Start the frontend application**:
    ```bash
    npm start
    ```
    The React app will open in your browser at `http://localhost:3000`.

---
## 🛡️ **Default Admin Credentials**

For initial access, the application automatically seeds a default admin user.

* **Email**: `admin@system.com`
* **Password**: `admin123`

---
## 🗺️ **API Endpoints**

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register a new user (student or faculty) |
| `/api/auth/login` | `POST` | Log in and receive a JWT token |
| `/api/admin/pending-users` | `GET` | Get all pending user registrations |
| `/api/admin/approve/:id` | `PATCH` | Approve a pending user |
| `/api/admin/reject/:id` | `PATCH` | Reject a pending user |
| `/api/admin/delete/:id` | `DELETE` | Delete a user (both user and student record if applicable) |
| `/api/faculty/students` | `GET` | Get a list of all approved students |
| `/api/faculty/students/:id` | `PATCH` | Update a student's marks and/or attendance |
| `/api/student/profile` | `GET` | Get the logged-in student's profile information |

---
## 📝 **License**

This project is licensed under the **MIT License**.

---
## 📧 **Contact**

If you have any questions or feedback, feel free to contact me:

* **GitHub**: https://github.com/Rahulsaroj02
* **Email**: `rahulsaroj0008@gmail.com`
