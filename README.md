# QR Code Management API

## 🌟 Introduction

The **QR Code Management API** is a backend application that provides the functionality for:

- **Creating and managing QR codes** (both static and dynamic)
- **Tracking QR code usage events**
- **Analyzing the performance of QR codes**
- **User authentication and access control** to ensure secure access to the QR codes.

---

## 🚀 Setup Instructions

### 1. **Clone the Repository**

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/brijeshgupta8/QR-Code-Management


2. Install Dependencies
Navigate to the project directory and install all the required dependencies using npm:
npm install


3. Configure Environment Variables
Create a .env file in the root directory and add the following content:

MONGO_URI=mongodb+srv://brijeshgupta8083:lCCkX0rylFjHabgD@cluster0.mdsrs.mongodb.net/qr-code-management?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_secret_key
PORT=3000

4. Run the Application
To start the server, run the following command:
node app.js

The application will be available at http://localhost:3000


🛠️ Dependencies
This project uses the following dependencies:

express: Web framework for building APIs.
mongoose: MongoDB object modeling for Node.js.
qrcode: Library for generating QR codes.
jsonwebtoken: For JWT-based authentication.
dotenv: For managing environment variables.


📄 API Documentation
The API documentation is available through Swagger UI. After running the application, you can access the documentation at:

http://localhost:3000/api-docs



