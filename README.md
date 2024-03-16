# E-Commerce Management System

This project is a simple web application for managing categories and products in an e-commerce system. It allows users to perform CRUD (Create, Read, Update, Delete) operations on both categories and products.

## Features

- **CRUD Operations:** Users can add, view, update, and delete categories and products.
- **Form Components:** Includes form components for adding new categories and products.
- **Update and Delete:** Provides functionality to update and delete categories and products.
- **Basic Styling:** Includes basic CSS styling for improved visual presentation.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MySQL

## Setup Instructions

1. Clone the repository:

    ```
    git clone <repository_url>
    cd ecommerce-management-system
    ```

2. Install dependencies:

    ```
    # Navigate to frontend directory
    cd frontend
    npm install

    # Navigate to backend directory
    cd ../backend
    npm install
    ```

3. Set up the MySQL database:

    - Create a MySQL database named `ecommerce`.
    - Execute the SQL script provided in `backend/server.js` to create tables for categories and products.

4. Configure the backend:

    - Open `backend/server.js` and update the MySQL connection details (host, user, password) with your own.

5. Run the application:

    ```
    # In the backend directory
    node server.js

    # In the frontend directory
    npm start
    ```

6. Access the application:

    - Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Upon accessing the application, you will see options to manage categories and products.
- Use the provided forms to add new categories and products.
- Click on the "Update" or "Delete" buttons to update or delete existing categories and products.

## License

This project is licensed under the [mukund9766](LICENSE).
