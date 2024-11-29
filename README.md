# QR Code Management API

## 🌟 Introduction

The **QR Code Management API** is a backend application designed to create and manage QR codes. It provides functionality for:

- **Generating static and dynamic QR codes**
- **Tracking QR code usage events**
- **Analyzing the performance of QR codes**
- **User authentication and access control** to ensure only authorized users can access their QR codes.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine using Git:

git clone https://github.com/brijeshgupta8/QR-Code-Management


### 1. Install Dependencies

Navigate to the project directory and install all the required dependencies using npm:

npm install


### 3. Configure Environment Variables

MONGO_URI: Your MongoDB connection string

JWT_SECRET=your_secret_key

PORT=3000


### 4. Run the Application :
   
node app.js

The application will be available at http://localhost:3000


### 🛠️ Dependencies

This project uses the following dependencies:

express: Web framework for building APIs.
mongoose: MongoDB object modeling for Node.js.
qrcode: Library for generating QR codes.
jsonwebtoken: For JWT-based authentication.
dotenv: For managing environment variables.


### 📄 API Documentation

The API documentation is available through Swagger UI. After running the application, you can access the documentation at:

http://localhost:3000/api-docs

### 💬 Contact

For any questions or issues, feel free to reach out to me at brijeshgupta8@gmail.com.



