QR Code Management

Introduction
The QR Code Management  is a backend application for creating and managing QR codes. It provides functionality for generating static and dynamic QR codes, tracking QR code usage events, and analyzing their performance. It also includes user authentication and access control to ensure only authorized users can access their QR codes.

Setup Instructions
1. Clone the Repository
 git clone https://github.com/brijeshgupta8/QR-Code-Management

2. Install Dependencies
Install all required dependencies using npm:
npm install

3. Configure Environment Variables
Create a .env file in the root directory with the following content:

MONGO_URI=mongodb+srv://brijeshgupta8083:lCCkX0rylFjHabgD@cluster0.mdsrs.mongodb.net/qr-code-management?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_secret_key
PORT=3000

4. Run the Application
Start the server with the following command: 
node app.js
The application will be available at http://localhost:3000.

Dependencies:

express: Web framework for building APIs.
mongoose: MongoDB object modeling for Node.js.
qrcode: Library for generating QR codes.
jsonwebtoken: For JWT-based authentication.
dotenv: For managing environment variables.


The API documentation is available at (Swagger UI)
http://localhost:3000/api-docs



